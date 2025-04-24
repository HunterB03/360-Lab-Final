from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, ListingSerializer, CheckoutSerializer, CartCreateSerializer, CartItemSerializer, CartIncDecSerializer, CheckoutViewSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Listing, Cart, CartItems, Checkout, CheckoutItems
from django.db.models.signals import post_save

from django.contrib.auth.models import Group
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def current_user_info(request):
    user = request.user
    groups = list(user.groups.values_list('name', flat=True))
    return Response({
		'id': user.id,
        'username': user.username,
		'firstname': user.first_name,
		'lastname' : user.last_name,
		'email' : user.email,
        'groups': groups,
		'is_superuser': user.is_superuser,
    })



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
	
class CheckoutCreate(generics.CreateAPIView):
	queryset = Checkout.objects.all()
	serializer_class = CheckoutSerializer
	permission_classes = [IsAuthenticated]
	
	def perform_create(self, serializer):
		serializer.save(user=self.request.user)

class CheckoutView(generics.ListAPIView):
	serializer_class = CheckoutViewSerializer
	permission_classes = [IsAuthenticated]

	def get_queryset(self):
		user = self.request.user
		return Checkout.objects.filter(user=user)
	
class CheckoutLastView(generics.ListAPIView):
	serializer_class = CheckoutViewSerializer
	permission_classes = [IsAuthenticated]

	def get_queryset(self):
		user = self.request.user
		return Checkout.objects.filter(user=user)#.order_by('-date_ordered').first()

class CartView(generics.ListAPIView):
	serializer_class = CartCreateSerializer
	permission_classes = [IsAuthenticated]

	def get_queryset(self):
		curr = self.request.user
		return Cart.objects.filter(user=curr)
	
class CartItemView(generics.ListAPIView):
	serializer_class = CartItemSerializer
	permission_classes = [IsAuthenticated]
	def get_queryset(self):
		curr = self.request.user
		currcart = Cart.objects.get(user=curr)
		return CartItems.objects.filter(cart=currcart)
	
class CartItemDetailsView(generics.ListAPIView):
	serializer_class = ListingSerializer
	permission_classes = [IsAuthenticated]

	def get_queryset(self):
		curr = self.request.user
		currcart = Cart.objects.get(user=curr)
		curritem = CartItems.objects.filter(cart=currcart)
		curritemid = curritem.values_list('item', flat=True)
		return Listing.objects.filter(id__in=curritemid)
#		pk = self.kwargs.get('pk')
#		return Listing.objects.filter(id=pk)
	
class CartIncrease(generics.UpdateAPIView):
	serializer_class = CartItemSerializer
	permission_classes = [IsAuthenticated]
	lookup_field = 'item'
	def get_queryset(self):
		curr = self.request.user
		currcart = Cart.objects.get(user=curr)
		return CartItems.objects.filter(cart=currcart)

class CartAdd(generics.CreateAPIView):
	queryset = CartItems.objects.all()
	serializer_class = CartItemSerializer
	permission_classes = [IsAuthenticated]

class CartDelete(generics.DestroyAPIView):
	serializer_class = CartItemSerializer
	permission_classes = [IsAuthenticated]
	lookup_field = 'item'
	def get_queryset(self):
		curr = self.request.user
		currcart = Cart.objects.get(user=curr)
		return CartItems.objects.filter(cart=currcart)

"""
def CartAdd(request, lid):
	queryset = Cart.objects.all()
	return "hello, world"

def CartDelete(request, lid):
	queryset = Cart.objects.all()

def CartUpdate(request, amt):
	queryset = Cart.objects.all()
"""