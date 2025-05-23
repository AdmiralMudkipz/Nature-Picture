from django.urls import path
from .views import ArtPieceDetailAPIView, ArtPieceListAPIView,ArtPieceCreateAPIView, ArtPieceDeleteAPIView, SellerArtPieceListAPIView, AllLocationsAPIView
# foward request to appropriate view
urlpatterns = [
    path('locations/', AllLocationsAPIView.as_view(), name='all-locations'),
    path('create/', ArtPieceCreateAPIView.as_view(), name='create-artpiece'),
    path('', ArtPieceListAPIView.as_view(), name='artpiece-list'),
    path('<int:seller_id>/art/', SellerArtPieceListAPIView.as_view(), name='seller-art'),
    path('<int:art_id>/', ArtPieceDetailAPIView.as_view(), name='artpiece-detail'),
    path('<int:art_id>/delete/', ArtPieceDeleteAPIView.as_view(), name='artpiece-delete'),

]