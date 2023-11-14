from django.contrib.auth import authenticate
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from .services import send_verification_code, user_create, send_password_verification_code, verify_password_reset_otp
from .models import User, Directory, File, Message
from .selectors import get_user
from .serializers import UserRegistrationSerializer, UserLoginSerializer, UserSerializer, \
    SMSVerificationSerializer, DirectorySerializer, FileSerializer, ChangePasswordSerializer, EmailInputSerializer, \
    PasswordResetSerializer, MessageSerializer, SendMessageSerializer, BalanceSerializer, DirectoryCreateSerializer
from .send_email import send_email


class OTPSendAPI(APIView):
    permission_classes = [AllowAny]
    serializer_class = SMSVerificationSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        code = send_verification_code(email=serializer.validated_data["email"])
        send_email(code=code, email=serializer.validated_data["email"])
        return Response(
            data={"detail": "code has been sent Susccessfuly"},
            status=status.HTTP_200_OK)


class UserRegistrationAPI(APIView):
    permission_classes = [AllowAny]
    serializer_class = UserRegistrationSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = user_create(**serializer.validated_data)
        return Response(data={"detail": f"user was created successfully",
                              **user.generate_tokens},
                        status=status.HTTP_201_CREATED)

class UserLoginAPI(APIView):
    permission_classes = [AllowAny]
    serializer_class = UserLoginSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = authenticate(**serializer.validated_data)
        if not user:
            return Response(data={"detail": "user with this credentials does not exist"},
                            status=status.HTTP_400_BAD_REQUEST)
        return Response(data={"detail": f"logged in successfully",
                              **user.generate_tokens},
                        status=status.HTTP_200_OK)



class UserLogOutAPI(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        refresh_token = request.data["refresh"]
        token = RefreshToken(refresh_token)
        token.blacklist()
        return Response(data={"detail": "user logged out successfully"},
                        status=status.HTTP_205_RESET_CONTENT)


class UserAPI(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UserSerializer

    def get(self, request):
        user = request.user
        serializer = self.serializer_class(user)
        return Response(serializer.data)


class DirectoryAPI(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = DirectorySerializer

    def get(self, request):
        directories = Directory.objects.filter(user=request.user)
        serializer = self.serializer_class(directories, many=True)
        return Response(serializer.data)


class DirectoryCreateAPI(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = DirectoryCreateSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            directory_name = serializer.validated_data['name']

            # Check if directory with the given name already exists for the user
            existing_directory = Directory.objects.filter(user=request.user, name=directory_name).first()
            if existing_directory:
                return Response({"detail": "Directory with this name already exists."},
                                status=status.HTTP_400_BAD_REQUEST)

            # Create the directory and set the user attribute
            directory = serializer.save(user=request.user)
            return Response({"id": directory.id, "name": directory.name}, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class FileAPI(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = FileSerializer

    def get(self, request, directory_id):
        files = File.objects.filter(directory__id=directory_id, directory__user=request.user)
        serializer = self.serializer_class(files, many=True)
        return Response(serializer.data)


class FileUploadAPI(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = FileSerializer

    def post(self, request, directory_id):
        if not Directory.objects.filter(id=directory_id, user=request.user).exists():
            return Response({"detail": "Directory not found."}, status=status.HTTP_404_NOT_FOUND)

        data = request.data.copy()
        data['directory'] = directory_id

        serializer = self.serializer_class(data=data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserChangePasswordAPI(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ChangePasswordSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = request.user
        if authenticate(email=user.email, password=serializer.validated_data["old_password"]):
            user.set_password(serializer.validated_data["new_password"])
            user.save()
            return Response(
                status=status.HTTP_200_OK,
                data={"detail": "password was changed successfully"})

        return Response(status=status.HTTP_400_BAD_REQUEST,
                        data={"detail": "old password is incorrect"})


class UserGetResetPasswordCodeAPI(APIView):
    permission_classes = [AllowAny]
    serializer_class = EmailInputSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        code = send_password_verification_code(email=serializer.validated_data["email"])
        return Response(
            data={"detail":"code has been sent successfully"},
            status=status.HTTP_200_OK)


class UserResetPasswordAPI(APIView):
    permission_classes = [AllowAny]
    serializer_class = PasswordResetSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.validated_data["email"]
        code = serializer.validated_data["code"]
        if verify_password_reset_otp(code=code, email=email):
            user = get_user(email=email)
            user.set_password(serializer.validated_data["password"])
            user.clean()
            user.save()
            return Response(status=status.HTTP_200_OK, data={"detail": "password successfully resetted"})
        return Response(status=status.HTTP_400_BAD_REQUEST, data={"detail":"password cannot be resetted"})


class SentMessagesList(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = MessageSerializer

    def get(self, request):
        user = request.user
        messages = Message.objects.filter(sender=user)
        serializer = self.serializer_class(messages, many=True)
        return Response(serializer.data)

class ReceivedMessagesList(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = MessageSerializer

    def get(self, request):
        user = request.user
        messages = Message.objects.filter(recipient=user).order_by('-timestamp')
        serializer = self.serializer_class(messages, many=True)
        return Response(serializer.data)

class SendMessage(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = SendMessageSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            message = serializer.save(sender=request.user)
            sent_messages = Message.objects.filter(sender=request.user).order_by('-timestamp')
            return Response(MessageSerializer(sent_messages, many=True).data, status=201)
        return Response(serializer.errors, status=400)

class UserBalances(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = BalanceSerializer

    def get(self, request):
        user = request.user
        serializer = self.serializer_class(user)
        return Response(serializer.data)


class UpdateProfileInfo(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UserSerializer

    def put(self, request):
        user = request.user
        if 'email' in request.data and request.data['email'] != user.email:
            return Response({"detail": "You cannot change your email."}, status=status.HTTP_400_BAD_REQUEST)
        for field in request.data.keys():
            try:
                User._meta.get_field(field)
            except Exception as e:
                return Response({"detail": f"The field {e} does not exist in the user profile."},
                                status=status.HTTP_400_BAD_REQUEST)
        serializer = self.serializer_class(user, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

