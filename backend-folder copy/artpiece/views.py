from django_filters.rest_framework import DjangoFilterBackend, FilterSet, CharFilter
from rest_framework.filters import SearchFilter
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.generics import RetrieveAPIView,ListAPIView, DestroyAPIView
from django.shortcuts import get_object_or_404
from base.models import Location, ArtPiece, Users  
from .serializers import ArtPieceSerializer, LocationSerializer # Import the serializer
import django_filters
from django.db.models import Q
import re

# retrieve all locations in the database
class AllLocationsAPIView(ListAPIView):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer

class ArtPieceFilter(django_filters.FilterSet):
    type_of_art = django_filters.BaseInFilter(field_name="type_of_art", lookup_expr="in")
    search = django_filters.CharFilter(method='filter_combined_search')
    
    def filter_combined_search(self, queryset, name, value):
        # Sanitize input - remove potentially harmful characters
        sanitized_value = self.sanitize_input(value)
        
        if not sanitized_value:
            return queryset
            
        # This means "find records where the value is in ANY of these fields" - 
        # without Q objects, Django's default behavior would require all conditions to match.
        return queryset.filter(
            Q(title__icontains=sanitized_value) | 
            Q(location__icontains=sanitized_value) |
            Q(artist__name__icontains=sanitized_value) |
            Q(description__icontains=sanitized_value)
        )
    
    class Meta:
        model = ArtPiece
        fields = ['type_of_art', 'search']


# uses Django REST Framework's ListAPIView which is made for listing multiple objects
# this is used to get a list of all art pieces in the database
# it will return a list of all art pieces in the database & can filter if needed 
class ArtPieceListAPIView(APIView):
    def get(self, request):
        art_pieces = ArtPiece.objects.all()
        serializer = ArtPieceSerializer(art_pieces, many=True)
        data = serializer.data
        
        # Debug print
        for piece in data:
            print(f"Art piece: {piece['name']}")
            print(f"  image: {piece.get('image')}")
            print(f"  image_url: {piece.get('image_url')}")
        
        return Response(data)

# uses Django REST Framework's RetrieveAPIView which is made for retrieving a single object 
class ArtPieceDetailAPIView(RetrieveAPIView):
    queryset = ArtPiece.objects.all()
    serializer_class = ArtPieceSerializer
    lookup_field = 'art_id'
    
    
# retrieve products for a specific user 
class SellerArtPieceListAPIView(ListAPIView):
    serializer_class = ArtPieceSerializer

    def get_queryset(self):
        seller_id = self.kwargs.get("seller_id")  # extract seller_id from URL
        return ArtPiece.objects.filter(user_id=seller_id)  # filter by the user_id in the ArtPiece model


    

# uses Django REST Framework's DestroyAPIView which is made for deleting a single object. 
# not sure if this will ever be needed. 
class ArtPieceDeleteAPIView(DestroyAPIView):
    queryset = ArtPiece.objects.all() # what model to look into
    serializer_class = ArtPieceSerializer
    lookup_field = 'art_id' # the field to look up by (pk) 
    


from rest_framework.parsers import MultiPartParser, FormParser

class ArtPieceCreateAPIView(APIView):
    parser_classes = (MultiPartParser, FormParser)
    
    def post(self, request):
        try:
            # Authentication check
            user_id = request.session.get('user_id')
            if not user_id:
                return Response({'error': 'User not authenticated'}, 
                            status=status.HTTP_401_UNAUTHORIZED)
            
            # Get User
            user = get_object_or_404(Users, pk=user_id)
            
            # Validate Location Data
            county = request.data.get('county')
            state = request.data.get('state')
            
            if not all([county, state]):
                return Response({'error': 'Both county and state are required'},
                            status=status.HTTP_400_BAD_REQUEST)

            # Handle Location
            try:
                location, _ = Location.objects.get_or_create(
                    county__iexact=county, # case insensitive 
                    state__iexact=state, # case insensitive
                    defaults={'county': county, 'state': state}
                )
            except Exception as e:
                print(f"Location error: {str(e)}")
                return Response({'error': f'Location error: {str(e)}'},
                            status=status.HTTP_400_BAD_REQUEST)

            # Prepare Art Data with user_id included
            art_data = {
                'name': request.data.get('name'),
                'description': request.data.get('description'),
                'type_of_art': request.data.get('type_of_art'),
                'stock_amount': request.data.get('stock_amount', 0),
                'price': request.data.get('price'),
                'location_id': location.location_id,
                'user_id': user.user_id,
            }
            
            # Create serializer for basic data
            serializer = ArtPieceSerializer(data=art_data)
            if not serializer.is_valid():
                print("Serializer errors:", serializer.errors)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            # Save the art piece first
            art_piece = serializer.save()
            
            # Then handle image upload separately
            if 'image' in request.FILES:
                try:
                    # Get the image file
                    image_file = request.FILES['image']
                    
                    # Update the art piece with the image
                    art_piece.image = image_file
                    art_piece.save()
                    
                    print(f"Image saved successfully: {art_piece.image.url}")
                except Exception as e:
                    print(f"Image save error: {str(e)}")
                    # Continue even if image upload fails
            else:
                print("No image file found in request")
            
            # Return the full art piece data
            return Response(ArtPieceSerializer(art_piece).data, status=status.HTTP_201_CREATED)
            
        except Exception as e:
            import traceback
            print(f"Unexpected error: {str(e)}")
            print(traceback.format_exc())
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)