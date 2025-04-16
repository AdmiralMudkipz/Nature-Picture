from rest_framework import serializers
from base.models import CartArtPiece, ArtPiece, Cart, Users
from artpiece.serializers import ArtPieceSerializer  # If you want nested details

class CartArtPieceSerializer(serializers.ModelSerializer):
    title = serializers.CharField(source='art.title', read_only=True)
    price = serializers.DecimalField(source='art.price', max_digits=10, decimal_places=2, read_only=True)

    class Meta:
        model = CartArtPiece
        fields = '__all__'  # or specify the fields you want to include
       #  fields = ['cart_art_id', 'cart', 'art', 'title', 'price']  # Include only fields you need

