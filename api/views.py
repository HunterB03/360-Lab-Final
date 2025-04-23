from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, ListingSerializer, CheckoutSerializer, CartCreateSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Listing, Cart
from django.db.models.signals import post_save

# Create your views here.
class CreateUserView(generics.CreateAPIView):
	queryset = User.objects.all()
	serializer_class = UserSerializer
	permission_classes = [AllowAny]

class ListingCreate(generics.ListCreateAPIView):
	queryset = Listing.objects.all()
	serializer_class = ListingSerializer
	permission_classes = [AllowAny]

	def perform_create(self, serializer):
		serializer.save(owns=self.request.user)

class ListingDelete(generics.CreateAPIView):
	serializer_class = ListingSerializer
	permission_classes = [IsAuthenticated]

	def get_queryset(self):
		user = self.request.user
		return Listing.objects.filter(owns=user)
	
class CheckoutCreate(generics.ListCreateAPIView):
	serializer_class = CheckoutSerializer
	permission_classes = [IsAuthenticated]

class CartView(generics.ListAPIView):
	serializer_class = CartCreateSerializer
	permission_classes = [IsAuthenticated]


def CartAdd(request, lid):
	queryset = Cart.objects.all()
	return "hello, world"

def CartDelete(request, lid):
	queryset = Cart.objects.all()

def CartUpdate(request, amt):
	queryset = Cart.objects.all()