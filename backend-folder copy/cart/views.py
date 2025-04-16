from rest_framework.generics import CreateAPIView, DestroyAPIView, ListAPIView
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from base.models import CartArtPiece, ArtPiece, Cart, Users
from .serializers import CartArtPieceSerializer
from django.shortcuts import get_object_or_404

    
# view all cart items for a specific user. to test this a user has to be logged in first  
class UserCartListView(ListAPIView):
    serializer_class = CartArtPieceSerializer

    def get_queryset(self):
        user_id = self.request.session.get('user_id')
        if not user_id:
            return CartArtPiece.objects.none()
        
        user = get_object_or_404(Users, pk=user_id)
        cart = getattr(user, 'cart', None)
        if not cart:
            return CartArtPiece.objects.none()
        
        return CartArtPiece.objects.filter(cart=cart)  
    


# Handles adding an item to the cart. not fully working rn. 
class AddToCartView(APIView):
    # permission_classes = [IsAuthenticated]

    def post(self, request, art_id):
        user = request.user  # assuming user is authenticated
        try:
            art_piece = ArtPiece.objects.get(art_id=art_id)
        except ArtPiece.DoesNotExist:
            return Response({"message": "Art piece not found."}, status=status.HTTP_404_NOT_FOUND)

        # Find or create the user's cart
        cart, created = Cart.objects.get_or_create(user=user)

        # Check if the art piece is already in the cart
        existing_item = CartArtPiece.objects.filter(cart=cart, art=art_piece).first()

        if existing_item:
            # If item already exists, increment the stock or show message
            if art_piece.stock_amount > 0:
                art_piece.stock_amount -= 1
                art_piece.save()
                return Response({"message": "Item added to cart."}, status=status.HTTP_200_OK)
            else:
                return Response({"message": "Item out of stock."}, status=status.HTTP_400_BAD_REQUEST)
        else:
            # If item doesn't exist, create a new CartArtPiece
            if art_piece.stock_amount > 0:
                CartArtPiece.objects.create(cart=cart, art=art_piece)
                art_piece.stock_amount -= 1
                art_piece.save()
                return Response({"message": "Item added to cart."}, status=status.HTTP_201_CREATED)
            else:
                return Response({"message": "Item out of stock."}, status=status.HTTP_400_BAD_REQUEST)


        
# Delete an item from the cart 
class RemoveFromCartAPIView(DestroyAPIView):
    queryset = CartArtPiece.objects.all()
    serializer_class = CartArtPieceSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)