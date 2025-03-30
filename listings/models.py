from django.db import models
from django.conf import settings
 
User = settings.AUTH_USER_MODEL

# Create your models here.
class Listing(models.Model):
    item_name = models.CharField(max_length=100)
    item_desc = models.CharField(max_length=500)
    pub_date = models.DateTimeField(auto_now_add = True)
    img = models.ImageField(default='default.jpg', blank=True)
    def __str__(self):
        return self.item_name