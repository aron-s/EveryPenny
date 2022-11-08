from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from django.http import HttpResponse
from django.contrib.auth.models import User
from .serializer import UserSerializer


# Create your views here.

@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def index(request):
    return HttpResponse('Hello World!');


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer()