from rest_framework import serializers
from django.core.cache import cache


from .models import User, Directory, File
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
        exclude =["password", "id", "last_login", "is_staff", "is_superuser", "record_date", "groups", "user_permissions", "update_date"]

class DirectorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Directory
        fields = '__all__'

class FileSerializer(serializers.ModelSerializer):
    class Meta:
        model = File
        fields = '__all__'


class UserPasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True, min_length=8)
    new_password = serializers.CharField(required=True, min_length=8)
