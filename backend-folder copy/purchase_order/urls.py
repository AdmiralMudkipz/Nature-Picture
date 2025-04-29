# purchase_order/urls.py
from django.urls import path
from .views import PurchaseOrderListAPIView, CreatePurchaseOrderAPIView

urlpatterns = [
    path('purchase-history/', PurchaseOrderListAPIView.as_view(), name='purchase-history'),
    path('checkout/', CreatePurchaseOrderAPIView.as_view(), name='checkout'),
]