from django.urls import path
from . import views

urlpatterns = [
    path("listings/", views.ListingCreate.as_view(), name="listing_list"),
    path("listings/delete/<int:pk>", views.ListingDelete.as_view(), name="delete_listing"),
]