from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save


# Create your models here.
class Listing(models.Model):
	title = models.CharField(max_length=100)
	content = models.CharField(max_length=500)
	pub_date = models.DateTimeField(auto_now_add=True)
	img = models.ImageField(upload_to='listing_images/',default='default.jpg', blank=True)
	owns = models.ForeignKey(User, blank=True, null=True, on_delete=models.SET_NULL)
	price = models.BigIntegerField()

	def __str__(self):
		return self.title
	
class Checkout(models.Model):
	user = models.ForeignKey(User, blank=True, null=True, on_delete=models.CASCADE)
	shipping_address = models.TextField(max_length=300)
	card_number = models.CharField(max_length=50)
	amount_paid = models.DecimalField(max_digits=20, decimal_places=2)
	date_ordered = models.DateTimeField(auto_now_add=True)

	def __str__(self):
		return str(self.id)

class CheckoutItems(models.Model):
	checkout = models.ForeignKey(Checkout, blank=True, null=True, on_delete=models.SET_NULL)
	user = models.ForeignKey(User, blank=True, null=True, on_delete = models.SET_NULL)
	item = models.ForeignKey(Listing, blank=True, null=True, on_delete=models.SET_NULL)
	quantity = models.PositiveIntegerField(default=1)
	price = models.DecimalField(max_digits=20, decimal_places=2)

	def __str__(self):
		return str(self.id)

class Cart(models.Model):
	user = models.ForeignKey(User, on_delete=models.CASCADE)
	total_price = models.DecimalField(default=0.00, max_digits=20, decimal_places=2)

	def __str__(self):
		return self.user.username
	
def create_cart(sender, instance, created, **kwargs):
	if created:
		user_profile = Cart(user=instance)
		user_profile.save()
#adds a profile for each new user
post_save.connect(create_cart, sender=User)

class CartItems(models.Model):
	cart = models.ForeignKey(Cart, on_delete=models.CASCADE)
	item = models.ForeignKey(Listing, on_delete=models.CASCADE)
	quantity = models.PositiveIntegerField(default=1)
	price = models.DecimalField(max_digits=20, decimal_places=2)
