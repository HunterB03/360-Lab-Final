from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, ListingSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Listing

# Create your views here.
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

class ListingCreate(generics.ListCreateAPIView):
    serializer_class = ListingSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Listing.objects.filter(owns=user)
    
    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(owns=self.request.user)
        else:
            print(serializer.errors)

class ListingDelete(generics.CreateAPIView):
    serializer_class = ListingSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Listing.objects.filter(owns=user)