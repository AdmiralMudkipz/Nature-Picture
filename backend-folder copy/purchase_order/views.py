# purchase_order/views.py
from rest_framework.generics import ListAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from django.db import transaction
from django.utils import timezone
from base.models import PurchaseOrder, PurchaseOrderArtPiece, ArtPiece, Users, Cart, CartArtPiece
from .serializers import PurchaseOrderSerializer

# Get Purchase Order History for a specific user
class PurchaseOrderListAPIView(ListAPIView):
    serializer_class = PurchaseOrderSerializer

    def get_queryset(self):
        # Manually authenticate user via session
        user_id = self.request.session.get('user_id')  # Assuming user_id is stored in session during login
        
        if not user_id:
            # If no user_id found in session, return an empty queryset
            return PurchaseOrder.objects.none()  

        # If authenticated, fetch the user
        user = get_object_or_404(Users, pk=user_id)

        # Return the PurchaseOrders for this user
        return PurchaseOrder.objects.filter(buyer=user).order_by('-date_purchased')
    
# Create a new Purchase Order (checkout process)
class CreatePurchaseOrderAPIView(APIView):
    def post(self, request):
        # Check if user is authenticated
        user_id = request.session.get('user_id')
        if not user_id:
            return Response({"error": "User not authenticated"}, status=status.HTTP_401_UNAUTHORIZED)
            
        user = get_object_or_404(Users, pk=user_id)
        
        # Check if user has items in cart
        try:
            cart = Cart.objects.get(user=user)
            cart_items = CartArtPiece.objects.filter(cart=cart)
            
            if not cart_items.exists():
                return Response({"error": "Cart is empty"}, status=status.HTTP_400_BAD_REQUEST)
                
        except Cart.DoesNotExist:
            return Response({"error": "Cart does not exist"}, status=status.HTTP_404_NOT_FOUND)
            
        # Get order notes if provided
        order_notes = request.data.get('order_notes', '')
            
        try:
            with transaction.atomic():
                # Create purchase order
                purchase_order = PurchaseOrder.objects.create(
                    buyer=user,
                    date_purchased=timezone.now().date()
                )
                
                # Add items to purchase order
                for cart_item in cart_items:
                    art_piece = cart_item.art

                    if art_piece.user.user_id == user.user_id:
                        return Response({
                            "error": f"You cannot purchase your own art: '{art_piece.name}'"
                         }, status=status.HTTP_400_BAD_REQUEST)
                    
                    # Check if item is still in stock
                    if art_piece.stock_amount <= 0:
                        transaction.set_rollback(True)
                        return Response({
                            "error": f"Item '{art_piece.name}' is out of stock"
                        }, status=status.HTTP_400_BAD_REQUEST)
                    
                    # Create purchase order item
                    PurchaseOrderArtPiece.objects.create(
                        purchase_order=purchase_order,
                        art=art_piece
                    )
                    
                    # Decrease stock
                    art_piece.stock_amount -= 1
                    art_piece.save()
                
                # Clear cart after successful order
                cart_items.delete()
                
                # Return purchase order details
                serializer = PurchaseOrderSerializer(purchase_order)
                return Response({
                    "message": "Order placed successfully",
                    "order": serializer.data
                }, status=status.HTTP_201_CREATED)
                
        except Exception as e:
            return Response({
                "error": f"Error creating purchase order: {str(e)}"
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)