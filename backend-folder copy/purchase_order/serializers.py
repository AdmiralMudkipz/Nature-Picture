from rest_framework import serializers
from base.models import PurchaseOrder, PurchaseOrderArtPiece, ArtPiece
from artpiece.serializers import ArtPieceSerializer
from users.serializers import UserSerializer  # your existing user serializer

class PurchaseOrderArtPieceSerializer(serializers.ModelSerializer):
    art = ArtPieceSerializer(read_only=True)

    class Meta:
        model = PurchaseOrderArtPiece
        fields = '__all__'

class PurchaseOrderSerializer(serializers.ModelSerializer):
    buyer = UserSerializer(read_only=True)
    art_pieces = serializers.SerializerMethodField()

    class Meta:
        model = PurchaseOrder
        fields = '__all__'  # Include all fields from the PurchaseOrder model

    def get_art_pieces(self, obj):
        purchase_items = PurchaseOrderArtPiece.objects.filter(purchase_order=obj)
        return PurchaseOrderArtPieceSerializer(purchase_items, many=True).data
