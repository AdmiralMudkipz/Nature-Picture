from rest_framework import serializers
from base.models import ArtPiece, Location


class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = '__all__'


# ArtPiece Serializer
class ArtPieceSerializer(serializers.ModelSerializer):
    location = LocationSerializer(read_only=True)  # show location details when viewing
    location_id = serializers.PrimaryKeyRelatedField(
        queryset=Location.objects.all(),
        source='location',
        write_only=True
    )

    class Meta:
        model = ArtPiece
        fields = [
            'art_id',
            'type_of_art',
            'name',
            'description',
            'image',
            'stock_amount',
            'price',
            'location',
            'location_id',
            'user',
        ]




