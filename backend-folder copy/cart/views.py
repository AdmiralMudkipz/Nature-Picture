# cart/views.py
from rest_framework.generics import ListAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from base.models import CartArtPiece, ArtPiece, Cart, Users
from .serializers import CartArtPieceSerializer
from django.shortcuts import get_object_or_404
from django.db import transaction

# View all cart items for a specific user
class UserCartListView(ListAPIView):
    serializer_class = CartArtPieceSerializer

    def get_queryset(self):
        user_id = self.request.session.get('user_id')
        if not user_id:
            return CartArtPiece.objects.none()
        
        user = get_object_or_404(Users, pk=user_id)
        
        # Get or create user's cart
        cart, created = Cart.objects.get_or_create(user=user)
        
        return CartArtPiece.objects.filter(cart=cart)

# Handle adding an item to the cart
class AddToCartView(APIView):
    def post(self, request, art_id):
        user_id = request.session.get('user_id')
        if not user_id:
            return Response({"error": "User not authenticated"}, status=status.HTTP_401_UNAUTHORIZED)
            
        user = get_object_or_404(Users, pk=user_id)
        
        try:
            art_piece = ArtPiece.objects.get(art_id=art_id)
        except ArtPiece.DoesNotExist:
            return Response({"error": "Art piece not found"}, status=status.HTTP_404_NOT_FOUND)

        # Find or create the user's cart
        cart, created = Cart.objects.get_or_create(user=user)

        # Check if the art piece is already in the cart
        existing_item = CartArtPiece.objects.filter(cart=cart, art=art_piece).first()

        if existing_item:
            # Item already in cart, return success
            return Response({"message": "Item already in cart"}, status=status.HTTP_200_OK)
        else:
            # Create new cart item
            if art_piece.stock_amount > 0:
                CartArtPiece.objects.create(cart=cart, art=art_piece)
                return Response({"message": "Item added to cart"}, status=status.HTTP_201_CREATED)
            else:
                return Response({"error": "Item out of stock"}, status=status.HTTP_400_BAD_REQUEST)

# Remove an item from the cart
class RemoveFromCartAPIView(APIView):
    def delete(self, request, art_id):
        user_id = request.session.get('user_id')
        if not user_id:
            return Response({"error": "User not authenticated"}, status=status.HTTP_401_UNAUTHORIZED)
            
        user = get_object_or_404(Users, pk=user_id)
        
        # Get user's cart
        try:
            cart = Cart.objects.get(user=user)
        except Cart.DoesNotExist:
            return Response({"error": "Cart does not exist"}, status=status.HTTP_404_NOT_FOUND)
            
        # Find art piece
        try:
            art_piece = ArtPiece.objects.get(art_id=art_id)
        except ArtPiece.DoesNotExist:
            return Response({"error": "Art piece not found"}, status=status.HTTP_404_NOT_FOUND)
            
        # Remove item from cart
        cart_item = CartArtPiece.objects.filter(cart=cart, art=art_piece).first()
        if cart_item:
            cart_item.delete()
            return Response({"message": "Item removed from cart"}, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Item not in cart"}, status=status.HTTP_404_NOT_FOUND)

# Clear cart
class ClearCartAPIView(APIView):
    def delete(self, request):
        user_id = request.session.get('user_id')
        if not user_id:
            return Response({"error": "User not authenticated"}, status=status.HTTP_401_UNAUTHORIZED)
            
        user = get_object_or_404(Users, pk=user_id)
        
        # Get user's cart
        try:
            cart = Cart.objects.get(user=user)
            
            # Delete all items in cart
            CartArtPiece.objects.filter(cart=cart).delete()
            
            return Response({"message": "Cart cleared"}, status=status.HTTP_200_OK)
        except Cart.DoesNotExist:
            return Response({"message": "Cart is already empty"}, status=status.HTTP_200_OK)