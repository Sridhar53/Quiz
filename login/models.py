from django.db import models

# Create your models here.

class user(models.Model):
    name = models.CharField(max_length=50)
    password = models.CharField(max_length=50)


class quiz_details(models.Model):
    user_name = models.CharField(max_length=50, default='')
    total_question = models.CharField(max_length=50, default='')
    correct_answer = models.CharField(max_length=50, default='')
    wrong_answer = models.CharField(max_length=50, default='')
    message = models.CharField(max_length=50, default='')
    time_taken = models.CharField(max_length=50, default='')