from django.urls import path
from login.views import index
from login.views import quiz
from login.views import startquiz

urlpatterns = [
    path('',index, name="index"),
    path('quizlist/', quiz, name="quiz"),
    path('startquiz/', startquiz, name="startquiz")
]