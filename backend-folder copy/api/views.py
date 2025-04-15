from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from django.shortcuts import get_object_or_404
from base.models import Location, ArtPiece, Users  
from .serializers import ArtPieceSerializer, SignupSerializer  # Import the serializer


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


# Handles user signup functionality.
class SignupAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = SignupSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()  # User is created here
            return Response({
                'message': 'User created successfully',
                'user': {
                    'username': user.username,
                    'email': user.email
                }
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




# Handles the login functionality. It is an API endpoint that 
# allows the frontend to send login data (username and password), checks the credentials 
# against the database, and returns a response based on whether the login is successful or not.

class LoginAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        try:
            user = Users.objects.get(username=username) # tries to find user object in database 
            if password == user.password: # if user is found 
                # create a session for the user by storing their user_id in Django's session framework — 
                # this is exactly how session-based auth works. Django will automatically send a session 
                # cookie back to the frontend (called sessionid) which will identify the user in future requests
                request.session['user_id'] = user.user_id 

                return Response({
                    'message': 'Login successful', 
                    'user_id': user.user_id,
                    'username': user.username,
                    'email': user.email,
                })
            else:
                return Response({'error': 'Invalid password'}, status=status.HTTP_401_UNAUTHORIZED)
        except Users.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        


class LogoutAPIView(APIView):
    def post(self, request):
        request.session.flush()  # clears session data
        return Response({'message': 'Logged out successfully'}, status=status.HTTP_200_OK)
