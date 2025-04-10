from django.urls import path
from .views import LoginAPIView, SignupAPIView

urlpatterns = [
    path('signup/', SignupAPIView.as_view(), name='signup'),  # Add the signup route
    path('login/', LoginAPIView.as_view(), name='token_obtain_pair'),
]