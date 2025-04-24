from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static
from .views import current_user_info
urlpatterns = [
    path("listings/", views.ListingCreate.as_view(), name="listing_list"),
    path("listings/delete/<int:pk>", views.ListingDelete.as_view(), name="delete_listing"),
    path("checkout/", views.CheckoutCreate.as_view(), name="checkout"),
    path("cart/", views.CartView.as_view(), name="cart"),
	path("cart/items/", views.CartItemView.as_view(), name="cartitems"),
    path("cart/add", views.CartAdd.as_view(), name="cartadd"),
    path("<int:item>/cart/delete", views.CartDelete.as_view(), name="cartdelete"),
    path('user-info/', current_user_info),
    path("<int:item>/cart/increase", views.CartIncrease.as_view(), name="cartincrease"),
	path("listings/specific", views.CartItemDetailsView.as_view(), name="specificlisting"),
    path("checkout/processing", views.CheckoutLastView.as_view(), name="processcheckout"),
    path("checkout/specific/<int:pk>", views.CheckoutView.as_view(), name="specificcheckout"),
    path('checkout/all', views.CheckoutsListView.as_view(), name='allcheckouts'),    
    path("checkout/item/", views.CheckoutItemCreate.as_view(), name="checkoutitemcreate")
] +static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)