from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import GenericAPIView
from django.http import HttpResponse
from django.contrib.auth.models import User
from django.contrib import auth
from .serializer import UserSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from django.conf import settings
import jwt



# Create your views here.

@api_view(['GET'])
@permission_classes([IsAuthenticated]) #not being used currently
def myprofile(request):
    content = {
        'status': 'Successfully Logged In!'
    }
    return Response(content)

@api_view(['POST'])
def validate(request):
    if request.method == "POST":   
        username = request.POST.get("username")
        password = request.POST.get("password")
        try:
            e = User.objects.get(username = username)
            return Response({'error': 'email already exists!'})
        except User.DoesNotExist:
            content = {
                'testing': username,
                'password2': password
            }

        return Response(content)


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class LoginView(GenericAPIView):
    
    def post(self, request):
        data = request.data
        username = data.get("username", "")
        password = data.get("password", "")

        user = auth.authenticate(username=username, password=password)

        if user:
            auth_token = jwt.encode(
                {"username": user.username}, settings.JWT_SECRET_KEY, algorithm="HS256"
            )
            serializer = UserSerializer(user)
            data = {'user': serializer.data, 'token':auth_token}
            return Response(data, status=status.HTTP_200_OK)
        
        return Response({'detail': 'Invalid credentials, please try again!'}, status=status.HTTP_401_UNAUTHORIZED)
