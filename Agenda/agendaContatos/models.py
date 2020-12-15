from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Contact(models.Model):
    owner = models.ForeignKey(to=User, on_delete=models.CASCADE)
    Name = models.CharField(max_length=45)
    Email = models.EmailField(max_length=45)
    CelPhone = models.CharField(max_length=45)
