from django.contrib import admin
from login.models import user
from login.models import quiz_details

# Register your models here.

admin.site.register(user)
admin.site.register(quiz_details)