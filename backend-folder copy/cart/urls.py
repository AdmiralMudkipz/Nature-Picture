from django.urls import path
from .views import AddToCartView, RemoveFromCartAPIView, UserCartListView

urlpatterns = [
    path('', UserCartListView.as_view(), name='user-cart'),
    path('remove/<int:art_id>/', RemoveFromCartAPIView.as_view(), name='remove-from-cart'),
    path('add-to-cart/<int:art_id>/', AddToCartView.as_view(), name='add_to_cart'),
]
