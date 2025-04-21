from django.contrib import admin
from .models import Listing, Checkout, CheckoutItems

# Register your models here.
admin.site.register(Listing)
admin.site.register(Checkout)
admin.site.register(CheckoutItems)