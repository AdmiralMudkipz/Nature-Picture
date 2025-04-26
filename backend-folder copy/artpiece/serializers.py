from rest_framework import serializers
from base.models import ArtPiece, Location, Users
from users.serializers import UserSerializer  # Assuming you have a UserSerializer


class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = '__all__'


# ArtPiece Serializer
class ArtPieceSerializer(serializers.ModelSerializer):
    location = LocationSerializer(read_only=True)  # show location details when viewing
    user = UserSerializer(read_only=True)  # show user details when viewing
    image = serializers.ImageField(max_length=None, use_url=True, required=False)
    image_url = serializers.SerializerMethodField()
    
    # these fields are for creating/updating the ArtPiece
    user_id = serializers.PrimaryKeyRelatedField(
        queryset=Users.objects.all(),
        source='user',
        write_only=True
    )
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
            'image_url',
            'stock_amount',
            'price',
            'location',
            'user',
            'user_id',
            'location_id', 
        ]
        
        # Specify fields that shouldn't be required for creation
        extra_kwargs = {
            'image': {'required': False},
        }
    def get_image_url(self, obj):
        if obj.image and hasattr(obj.image, 'url'):
            # Add print statement to debug
            url = obj.image.url
            print(f"Generated image URL: {url}")
            return url
        return None