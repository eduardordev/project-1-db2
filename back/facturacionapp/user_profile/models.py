# models.py
from django.db import models
from db_connection import user_profile_collection

class UserProfile(models.Model):
    username = models.CharField(max_length=100)
    email = models.EmailField()
    password = models.CharField(max_length=255)

    def createUser(self):
        user_profile_collection.insert_one({
            'username': self.username,
            'email': self.email,
            'password':self.password,
        })
