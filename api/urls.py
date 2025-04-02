from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path("listings/", views.ListingCreate.as_view(), name="listing_list"),
    path("listings/delete/<int:pk>", views.ListingDelete.as_view(), name="delete_listing"),
] +static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)