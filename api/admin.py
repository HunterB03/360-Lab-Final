from django.contrib import admin
from .models import Listing, Checkout, CheckoutItems, Cart, CartItems

# Register your models here.
admin.site.register(Listing)
admin.site.register(Checkout)
admin.site.register(CheckoutItems)
admin.site.register(Cart)
admin.site.register(CartItems)