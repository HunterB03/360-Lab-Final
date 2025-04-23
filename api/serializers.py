from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Listing, Checkout, Cart

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password" : {"write_only":True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class ListingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Listing
        fields = ["id", "title", "content", "pub_date", "img", "owns", "price"]
        extra_kwargs = {"owns": {"read_only":True}}
        
class CheckoutSerializer(serializers.ModelSerializer):
    class Meta:
        model = Checkout

class CartCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = ["user"]