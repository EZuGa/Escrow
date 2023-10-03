from django.contrib.auth import authenticate
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from .services import send_verification_code, verify_sms_code, user_create
from .models import User, Directory, File
from .selectors import get_user_qs
from .serializers import UserRegistrationSerializer, UserLoginSerializer, UserSerializer, UserPasswordSerializer, \
    SMSVerificationSerializer, DirectorySerializer, FileSerializer


class OTPSendAPI(APIView):
    permission_classes = [AllowAny]
    serializer_class = SMSVerificationSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        code = send_verification_code(email=serializer.validated_data["email"])
        return Response(
            data={"code": code},
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
    serializer_class = DirectorySerializer

    def post(self, request):
        data = request.data.copy()
        data['user'] = request.user.id

        serializer = self.serializer_class(data=data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
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
    serializer_class = UserPasswordSerializer

    def patch(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = authenticate(email=request.user.email,
                            password=serializer.validated_data["old_password"])
        if user:
            user.set_password(serializer.validated_data["new_password"])
            user.clean()
            user.save()
            return Response(
                data={"detail": "password was changed successfully"},
                status=status.HTTP_202_ACCEPTED)

        return Response(
            data={"detail": "invalid password was provided"},
            status=status.HTTP_400_BAD_REQUEST)
