from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.generics import RetrieveAPIView,ListAPIView
from django.shortcuts import get_object_or_404
from base.models import Location, ArtPiece, Users  
from .serializers import ArtPieceSerializer # Import the serializer


# uses Django REST Framework's RetrieveAPIView which is made for retrieving a single object 
class ArtPieceDetailAPIView(RetrieveAPIView):
    queryset = ArtPiece.objects.all()
    serializer_class = ArtPieceSerializer
    lookup_field = 'art_id'

# uses Django REST Framework's ListAPIView which is made for listing multiple objects
# this is used to get a list of all art pieces in the database
# it will return a list of all art pieces in the database
class ArtPieceListAPIView(ListAPIView):
    queryset = ArtPiece.objects.all()
    serializer_class = ArtPieceSerializer

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
        art_data['location'] = location.location_id
        art_data['user'] = user.user_id  # This is the critical fix

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


