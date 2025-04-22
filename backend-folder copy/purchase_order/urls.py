from django.urls import path
from .views import PurchaseOrderListAPIView

urlpatterns = [
    path('purchase-history/', PurchaseOrderListAPIView.as_view(), name='purchase-history'),
]