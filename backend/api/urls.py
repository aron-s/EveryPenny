from django.contrib import admin
from django.urls import path, include
from .views import UserViewSet, myprofile, validate
from rest_framework.routers import DefaultRouter


router = DefaultRouter()
router.register('users', UserViewSet)


urlpatterns = [
    path('api/', include(router.urls)),
    path('api/myprofile/', myprofile),
    path('api/validate/', validate),
]