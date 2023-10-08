import uuid
from django.contrib.auth.models import PermissionsMixin, AbstractBaseUser
from django.core import validators
from django.db import models
# Create your models here.
from rest_framework_simplejwt.tokens import RefreshToken
from apps.users.managers import UserManager


class User(AbstractBaseUser, PermissionsMixin):
    """
    Defines Our Custom User Class
    """
    id = models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, unique=True)
    email = models.EmailField(
        db_index=True, validators=[validators.validate_email], unique=True, blank=False)
    phone = models.CharField(max_length=15, blank=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    record_date = models.DateTimeField(auto_now_add=True)
    update_date = models.DateTimeField(auto_now=True)
    firstname = models.CharField(max_length=255, blank=True, null=True)
    lastname = models.CharField(max_length=255, blank=True, null=True)
    gender = models.CharField(max_length=10, choices=[('male', 'Male'), ('female', 'Female'), ('other', 'Other')], blank=True, null=True)
    age = models.PositiveIntegerField(blank=True, null=True)
    social_status = models.CharField(max_length=255, blank=True, null=True)
    nationality = models.CharField(max_length=255, blank=True, null=True)
    country = models.CharField(max_length=255, blank=True, null=True)
    city = models.CharField(max_length=255, blank=True, null=True)
    address = models.TextField(blank=True, null=True)
    zip_code = models.CharField(max_length=10, blank=True, null=True)
    passport_number = models.CharField(max_length=255, blank=True, null=True)
    issue_date = models.DateTimeField(blank=True, null=True)
    expiration_date = models.DateTimeField(blank=True, null=True)
    identification_number = models.CharField(max_length=255, blank=True, null=True)
    who_issued_passport = models.CharField(max_length=255, blank=True, null=True)
    balance_usd = models.FloatField(default=0)
    balance_eur = models.FloatField(default=0)
    balance_cny = models.FloatField(default=0)
    balance_usdt = models.FloatField(default=0)

    USERNAME_FIELD = 'email'

    objects = UserManager()

    @property
    def generate_tokens(self):
        """
        gets default jwt access and refresh tokens
        """
        refresh = RefreshToken.for_user(self)

        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }

class Directory(models.Model):
    id = models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, unique=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='directories')
    name = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    path = models.CharField(max_length=500, blank=True, null=True)
    ONGOING = 'ongoing'
    FAILED = 'failed'
    SUCCEEDED = 'succeeded'
    STATUS_CHOICES = [
        (ONGOING, 'Ongoing'),
        (FAILED, 'Failed'),
        (SUCCEEDED, 'Succeeded'),
    ]
    status = models.CharField(
        max_length=10,
        choices=STATUS_CHOICES,
        default=ONGOING,
    )

    def __str__(self):
        return self.path
    def save(self, *args, **kwargs):
        if not self.path:
            sanitized_email = self.user.email.replace("@", "_").replace(".", "_")
            self.path = f"{sanitized_email}/{self.name}/"
        super(Directory, self).save(*args, **kwargs)

def file_upload_path(instance, filename):
    return f"{instance.directory.path}{filename}"
class File(models.Model):
    id = models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, unique=True)
    directory = models.ForeignKey(Directory, on_delete=models.CASCADE, related_name='files')
    name = models.CharField(max_length=255)
    uploaded_at = models.DateTimeField(auto_now_add=True)
    file = models.FileField(upload_to=file_upload_path, null=True)

    def __str__(self):
        return self.name

class Message(models.Model):
    sender = models.ForeignKey(User, related_name='sent_messages', on_delete=models.CASCADE)
    recipient = models.ForeignKey(User, related_name='received_messages', on_delete=models.CASCADE)
    subject = models.CharField(max_length=200)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)



#TODO: file with same name in same directory and all file and folder checks