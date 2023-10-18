import random
from django.core.cache import cache
from .send_email import send_email
from .models import User
def generate_code() -> str:
    return ''.join(random.choices([str(i) for i in range(10)], k=6))

def send_verification_code(*, email: str):
    code = generate_code()
    # send_email(message_to=email, message_text=code)
    cache.set(email, code, 60)
    return code

def send_password_verification_code(*, email: str):
    code = generate_code()
    data = {"purpose": "password_reset", "code": code}
    send_email(code=code, email=email)
    cache.set(email, data, 60)
    return code

def verify_password_reset_otp(*, code: str, email: str) -> bool:
    password_reset_data = cache.get(email)
    if password_reset_data:
        purpose = password_reset_data.get("purpose")
        if purpose == "password_reset":
            if password_reset_data.get("code") == code:
                cache.delete(email)
                return True

    return False


def user_create(**kwargs) -> User:
    return User.objects.create_user(**kwargs)



