from sys import prefix
from django.conf import settings
import jwt
from rest_framework import authentication, exceptions
from django.contrib.auth.models import User

class JWTAuthentication(authentication.BaseAuthentication):
    def authenticate(self, request):
        auth_data = authentication.get_authorization_header(request)

        if not auth_data:
            return None

        prefix, token = auth_data.decode('uft-8').split(' ')

        try:
            payload = jwt.decode(token, settings.JWT_SECRET_KEY, algorithms="HS256")
            user = User.objects.get(username=payload["username"])
            return (user, token)
        
        except jwt.DecodeError as identifier:
            raise exceptions.AuthenticationFailed("Your token is invalid!")

        except jwt.ExpiredSignatureError as identifier:
            raise exceptions.AuthenticationFailed("Your token has expired!")

        return super().authenticate(request)