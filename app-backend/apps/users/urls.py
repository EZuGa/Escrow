from .api import UserRegistrationAPI, UserLoginAPI, UserLogOutAPI, UserAPI, OTPSendAPI, DirectoryAPI, FileAPI, \
    DirectoryCreateAPI, FileUploadAPI, UserChangePasswordAPI, UserGetResetPasswordCodeAPI, UserResetPasswordAPI, \
    SentMessagesList, ReceivedMessagesList, SendMessage, UserBalances
from django.urls import path, include
from rest_framework_simplejwt.views import TokenRefreshView


auth_urls = [
    path(f'register/', UserRegistrationAPI.as_view(), name='register-api'),
    path(f'login/', UserLoginAPI.as_view(), name='login-api'),
    path(f'logout/', UserLogOutAPI.as_view(), name='logout-api'),
    path(f"sms_code/", OTPSendAPI.as_view(), name="get-sms-code"),
    path(f'refresh/', TokenRefreshView.as_view(), name='token-refresh'),


]

user_urls = [
    path(f"profile/", UserAPI.as_view(), name='user'),
    path('directories/', DirectoryAPI.as_view(), name='directory-list'),
    path('directories/<uuid:directory_id>/files/', FileAPI.as_view(), name='file-list'),
    path('directories/create/', DirectoryCreateAPI.as_view(), name='directory-create'),
    path('directories/<uuid:directory_id>/files/upload/', FileUploadAPI.as_view(), name='file-upload'),
    path(f"change_password/", UserChangePasswordAPI.as_view(), name="user-change-password"),
    path(f"reset_password/", UserGetResetPasswordCodeAPI.as_view(), name="user-get-reset-password-code"),
    path(f"reset_password_code/", UserResetPasswordAPI.as_view(), name="user-reset-password"),
    path('messages/sent/', SentMessagesList.as_view(), name='sent-messages'),
    path('messages/received/', ReceivedMessagesList.as_view(), name='received-messages'),
    path('messages/send/', SendMessage.as_view(), name='send-message'),
    path('balances/', UserBalances.as_view(), name='user-balances'),

]
urlpatterns = [
    path(f"jwt/", include(auth_urls)),
    path(f"", include(user_urls))
]
