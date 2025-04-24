from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Listing, Checkout, Cart, CartItems

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password", "first_name", "last_name","email"]
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

class CartItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartItems
        fields = ["cart", "item", "quantity", "price"]

class CartIncDecSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartItems
        fields = ["item","quantity"]