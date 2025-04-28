from rest_framework.generics import CreateAPIView,ListAPIView
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.shortcuts import get_object_or_404
from .serializers import PurchaseOrderSerializer
from base.models import PurchaseOrder, CartArtPiece, ArtPiece, Users

# retrieve all purchase orders for a specific user. 
class PurchaseOrderListAPIView(ListAPIView):
    serializer_class = PurchaseOrderSerializer
    permission_classes = [AllowAny]  # Keep AllowAny if you still want it or change to IsAuthenticated if needed

    def get_queryset(self):
        # Manually authenticate user via session
        user_id = self.request.session.get('user_id')  # Assuming user_id is stored in session during login
        
        if not user_id:
            # If no user_id found in session, return an empty queryset or an error response
            return PurchaseOrder.objects.none()  # Return an empty queryset

        # If authenticated, fetch the user
        user = get_object_or_404(Users, pk=user_id)

        # Now you can filter the PurchaseOrders based on the authenticated user
        return PurchaseOrder.objects.filter(buyer=user)  # Assuming 'buyer' is a ForeignKey to 'Users'
    
    
    
# create a new purchase order 
class PurchaseOrderCreateAPIView(CreateAPIView):
    serializer_class = PurchaseOrderSerializer