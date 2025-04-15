from django.urls import path
from .views import ArtPieceDetailAPIView, ArtPieceListAPIView,ArtPieceCreateAPIView
# foward request to appropriate view
urlpatterns = [
    path('create/', ArtPieceCreateAPIView.as_view(), name='create-artpiece'),
    path('', ArtPieceListAPIView.as_view(), name='artpiece-list'),
    path('<int:art_id>/', ArtPieceDetailAPIView.as_view(), name='artpiece-detail'),
]