from rest_framework import serializers
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(max_length=45, min_length=8, write_only=True)
    username = serializers.EmailField(max_length=45, min_length=4)
    email = serializers.EmailField(max_length=45, min_length=4)

    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def validate(self, attrs):
        email = attrs.get('email', '')
        if User.objects.filter(email=email).exists():
            raise serializers.ValidationError(
                {'email': ('Email is already in use')})
        return super().validate(attrs)

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)


class LoginSerializer(serializers.ModelSerializer):
    password = serializers.CharField(max_length=45, min_length=8, write_only=True)
    username = serializers.CharField(max_length=45, min_length=2)

    class Meta:
        model = User
        fields = ['username', 'password']


class CurrentUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username',)