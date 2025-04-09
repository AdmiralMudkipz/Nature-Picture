from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from base.models import Users  

class LoginAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        try:
            user = Users.objects.get(username=username) # tries to find user object in database 
            if password == user.password: # if user is found 
                request.session['user_id'] = user.user_id  # then set session variable
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
