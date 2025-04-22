from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.generics import RetrieveAPIView,ListAPIView, DestroyAPIView
from django.shortcuts import get_object_or_404
from base.models import Location, ArtPiece, Users  
from .serializers import ArtPieceSerializer # Import the serializer

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



# uses Django REST Framework's ListAPIView which is made for listing multiple objects
# this is used to get a list of all art pieces in the database
# it will return a list of all art pieces in the database
class ArtPieceListAPIView(ListAPIView):
    queryset = ArtPiece.objects.all()
    serializer_class = ArtPieceSerializer
    

# uses Django REST Framework's DestroyAPIView which is made for deleting a single object. 
# not sure if this will ever be needed. 
class ArtPieceDeleteAPIView(DestroyAPIView):
    queryset = ArtPiece.objects.all() # what model to look into
    serializer_class = ArtPieceSerializer
    lookup_field = 'art_id' # the field to look up by (pk) 
    


# Handles the creation of a new art piece.
class ArtPieceCreateAPIView(APIView):
    def post(self, request):
        # authentication Check
        user_id = request.session.get('user_id')
        if not user_id:
            return Response({'error': 'User not authenticated'}, 
                          status=status.HTTP_401_UNAUTHORIZED)

        # get User
        user = get_object_or_404(Users, pk=user_id)
        
        # validate Location Data
        county = request.data.get('county')
        state = request.data.get('state')
        
        if not all([county, state]):
            return Response({'error': 'Both county and state are required'},
                          status=status.HTTP_400_BAD_REQUEST)

        # handle Location
        try:
            location, _ = Location.objects.get_or_create(
                county=county,
                state=state,
                defaults={'county': county, 'state': state}
            )
        except Exception as e:
            return Response({'error': f'Location error: {str(e)}'},
                          status=status.HTTP_400_BAD_REQUEST)

        # prepare Art Data with user_id included
        art_data = request.data.copy()
        art_data['location_id'] = location.location_id
        art_data['user_id'] = user.user_id  # This is the critical fix

        # serializer handling
        serializer = ArtPieceSerializer(data=art_data)
        if not serializer.is_valid():
            return Response(serializer.errors,
                         status=status.HTTP_400_BAD_REQUEST)

        # save Art Piece
        try:
            art_piece = serializer.save()
            return Response(ArtPieceSerializer(art_piece).data,
                         status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'error': f'Save failed: {str(e)}'},
                         status=status.HTTP_500_INTERNAL_SERVER_ERROR)


