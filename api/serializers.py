from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Listing, Checkout, Cart, CartItems, CheckoutItems

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
        fields = ["shipping_address", "card_number", "amount_paid"]

class CheckoutItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = CheckoutItems
        fields = ["item", "quantity", "price"]

class CheckoutWithItemsSerializer(serializers.ModelSerializer):
    items = serializers.SerializerMethodField()

    class Meta:
        model = Checkout
        fields = ["id", "shipping_address", "amount_paid", "date_ordered", "items"]

    def get_items(self, obj):
        items = CheckoutItems.objects.filter(checkout=obj)
        return CheckoutItemSerializer(items, many=True).data

class CheckoutViewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Checkout
        fields = ["id", "user", "shipping_address", "card_number", "amount_paid"]


class CartCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = ["id","user"]

class CartItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartItems
        fields = ["cart", "item", "quantity", "price"]

class CartIncDecSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartItems
        fields = ["item","quantity"]