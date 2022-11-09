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
@permission_classes([IsAuthenticated])
def myprofile(request):
    content = {
        'status': 'Successfully Logged In!'
    }
    return Response(content)

@api_view(['POST'])
def validate(request):
    if request.method == "POST":   
        username = request.POST["username"]
        password = request.POST.get("password")
        try:
            e = User.objects.get(username = username)
            return Response({'error': 'email already exists!'})
        except User.DoesNotExist:
            content = {
                'email2': validateEmail(username),
                'password2': validatePassword(password)
            }

        return Response(content)

def validateEmail( email ):
    from django.core.validators import validate_email
    from django.core.exceptions import ValidationError
    try:
        validate_email( email )
        return  'true'
    except ValidationError:
        return 'false'
    
def validatePassword( password ):
    if password == None:
        return 'false'

    if len(password) >= 8 and len(password) <= 24:
        return  'true'
    else:
        return 'false'


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer