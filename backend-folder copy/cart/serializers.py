# cart/serializers.py
from rest_framework import serializers
from base.models import CartArtPiece, ArtPiece, Cart, Users
from artpiece.serializers import ArtPieceSerializer
from users.serializers import UserSerializer

class CartArtPieceSerializer(serializers.ModelSerializer):
    art = ArtPieceSerializer(read_only=True)
    
    class Meta:
        model = CartArtPiece
        fields = ['cart_art_id', 'cart', 'art']

class CartSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    items = serializers.SerializerMethodField()
    
    class Meta:
        model = Cart
        fields = ['cart_id', 'user', 'items']
    
    def get_items(self, obj):
        cart_items = CartArtPiece.objects.filter(cart=obj)
        return CartArtPieceSerializer(cart_items, many=True).data