from django.db.models import QuerySet

from .models import User


def get_user(**kwargs: dict) -> User:
    return User.objects.filter(**kwargs).first()


def get_user_qs(**kwargs: dict) -> QuerySet[User]:
    return User.objects.filter(**kwargs)
