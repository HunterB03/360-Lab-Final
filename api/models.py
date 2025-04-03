from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Listing(models.Model):
    title = models.CharField(max_length=100)
    content = models.CharField(max_length=500)
    pub_date = models.DateTimeField(auto_now_add=True)
    img = models.ImageField(upload_to='listing_images/',default='default.jpg', blank=True)
    owns = models.ForeignKey(User, on_delete=models.CASCADE)
    price = models.BigIntegerField()

    def __str__(self):
        return self.title