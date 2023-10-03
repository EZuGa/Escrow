import random
from django.core.cache import cache

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
    # send_email(message_to=email, message_text=code)
    cache.set(email, data, 60)
    return code

def verify_sms_code(*, code: str, email: str) -> bool:
    if cache.get(email) == code:
        cache.set(email, code, 180)
        return True


def user_create(**kwargs) -> User:
    return User.objects.create_user(**kwargs)




