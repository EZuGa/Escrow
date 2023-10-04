from rest_framework import serializers
from django.core.cache import cache


from .models import User, Directory, File, Message
from .selectors import get_user


class SMSVerificationSerializer(serializers.Serializer):
    email = serializers.EmailField()

    def validate(self, attrs):
        if get_user(email=attrs["email"]):
            raise serializers.ValidationError("User With This Email Already Exists")
        return attrs


class UserRegistrationSerializer(serializers.Serializer):
    email = serializers.CharField(min_length=4)
    password = serializers.CharField(min_length=8)
    code = serializers.CharField(min_length=6)

    def validate(self, attrs):
        if get_user(email=attrs["email"]):
            raise serializers.ValidationError("user with this email already exists")

        code = cache.get(attrs["email"])
        if not code:
            raise serializers.ValidationError("code has expired")
        if code != attrs["code"]:
            raise serializers.ValidationError("code does not match")

        attrs.pop("code")
        return attrs


class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    password = serializers.CharField(required=True, min_length=8)


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        exclude =["password", "id", "last_login", "is_staff", "is_superuser", "record_date", "groups", "user_permissions", "update_date", "balance_usd", "balance_eur","balance_cny","balance_usdt"]

class DirectorySerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()

    def get_user(self, obj):
        return obj.user.email
    class Meta:
        model = Directory
        fields = '__all__'

class FileSerializer(serializers.ModelSerializer):
    class Meta:
        model = File
        fields = '__all__'


class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(min_length=8)
    new_password = serializers.CharField(min_length=8)

    def validate(self, attrs):
        if attrs["old_password"] == attrs["new_password"]:
            raise serializers.ValidationError("new password can not be same as old password")

        return attrs

class EmailInputSerializer(serializers.Serializer):
    email = serializers.EmailField()

    def validate(self, attrs):
        if not get_user(email=attrs["email"]):
            raise serializers.ValidationError("User With This Email Does Not Exists")

        return attrs

class PasswordResetSerializer(serializers.Serializer):
    email = serializers.EmailField()
    code = serializers.CharField(min_length=6)
    password = serializers.CharField(min_length=8)
    repeat_password = serializers.CharField(min_length=8)

    def validate(self, attrs):
        if attrs["password"] != attrs["repeat_password"]:
            raise serializers.ValidationError("Passwords Does Not Match")

        return attrs

class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = '__all__'


class SendMessageSerializer(serializers.Serializer):
    recipient_email = serializers.EmailField()
    subject = serializers.CharField(max_length=255)
    content = serializers.CharField()

    def create(self, validated_data):
        recipient_email = validated_data.pop('recipient_email')
        recipient = User.objects.get(email=recipient_email)
        return Message.objects.create(recipient=recipient, **validated_data)

class BalanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['balance_usd', 'balance_eur', 'balance_cny', 'balance_usdt']