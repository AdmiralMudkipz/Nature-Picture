from django.urls import path
from .views import ArtPieceCreateAPIView, LoginAPIView, SignupAPIView, LogoutAPIView, TestUploadAPIView

urlpatterns = [
    path('create-artpiece/', ArtPieceCreateAPIView.as_view(), name='create-artpiece'),
    path('signup/', SignupAPIView.as_view(), name='signup'),  # Add the signup route
    path('login/', LoginAPIView.as_view(), name='token_obtain_pair'),
    path('logout/', LogoutAPIView.as_view(), name='logout'),
            # New test upload route
    path('test-upload/', TestUploadAPIView.as_view(), name='test-upload'),
]