from django.db import models
import string
import random
# Create your models here.

def generateUniqueCode():
    length = 6

    while(True):
        code = ''.join(random.choices(string.ascii_uppercase, k = length)) # will generate a random code of k length all uppercase
        if Room.objects.filter(code = code).count() ==0: #checks to see if there are no other codes like itself
            break
    return code

class Room(models.Model):
    code = models.CharField(max_length= 8, default = generateUniqueCode, unique = True) #code for each room, with max length of 8 and unique 
    host = models.CharField(max_length = 50, unique = True) #one host per room, with name length of 50
    guest_can_pause= models.BooleanField(null = False, default = False) #null = false means must pass a value
    votes_to_skip = models.IntegerField(null=False, default = 1) #need 1 vote to skip, need to pass a value
    created_at = models.DateTimeField(auto_now_add=True) #never have to pass adata time to object, autmatically makes a date time upon creation of a room

    