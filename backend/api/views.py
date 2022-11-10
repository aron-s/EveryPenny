from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from django.http import HttpResponse
from django.contrib.auth.models import User
from .serializer import UserSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import permissions



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