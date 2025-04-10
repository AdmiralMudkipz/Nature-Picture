from django.urls import path
from .views import LoginAPIView, SignupAPIView, LogoutAPIView

urlpatterns = [
    path('signup/', SignupAPIView.as_view(), name='signup'),  # Add the signup route
    path('login/', LoginAPIView.as_view(), name='token_obtain_pair'),
    path('logout/', LogoutAPIView.as_view(), name='logout'),
]