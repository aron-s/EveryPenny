from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework.authtoken.views import Token
from rest_framework.validators import UniqueValidator

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password']

        extra_kwargs = { 'password' : { 
            'write_only': True,
            'required': True
        }}
    
    def validate(self, value):
        data = self.get_initial()
        username = data.get("username")
        username_qs = User.objects.filter(username=username)

        def validateEmail( email ):
            from django.core.validators import validate_email
            from django.core.exceptions import ValidationError
            try:
                validate_email( email )
                return True
            except ValidationError:
                return False
    
        def validatePassword( password ):
            if password == None:
                return False

            if len(password) >= 8 and len(password) <= 24:
                return  True
            else:
                return False

        if username_qs.exists():
            raise serializers.ValidationError({'error': ('Email is already in use!')})
        elif not validateEmail(username):
            raise serializers.ValidationError({'error': ('Username is not an email!')})
        elif not validatePassword(data.get("password")):
            raise serializers.ValidationError({'error': ('Password should be between 8-24 characters!')})
        else:
            pass
        return value

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        Token.objects.create(user=user)
        return user


