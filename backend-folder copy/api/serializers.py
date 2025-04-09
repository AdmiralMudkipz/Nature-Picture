
from rest_framework import serializers
from base.models import Users  

class SignupSerializer(serializers.ModelSerializer): # defining a custom serializer for user signups
    password_confirm = serializers.CharField(write_only=True) # needed to check if the user typed their password correctly twice 

    class Meta:
        model = Users
        fields = ['username', 'email', 'first_name', 'last_name', 'password', 'password_confirm']

        extra_kwargs = { 
            'password': {'write_only': True} # this field should only be used when writing data (like POST or PUT requests), but it should never be shown when sending data back to the client in API responses
        }

    def validate(self, data): # custom validator 
        if data['password'] != data['password_confirm']: # if the two password fields don't match, raise an error
            raise serializers.ValidationError("Passwords do not match.")
        
        if Users.objects.filter(username=data['username']).exists(): # check if the username already exists in the database
            raise serializers.ValidationError("Username is already taken.")

        if Users.objects.filter(email=data['email']).exists(): # check if the email already exists in the database
            raise serializers.ValidationError("Email is already in use.")

        return data

    def create(self, validated_data):
        validated_data.pop('password_confirm')  # remove this field before creating user 
        return Users.objects.create(**validated_data)
