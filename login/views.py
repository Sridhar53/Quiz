from django.shortcuts import render, redirect
from login.models import user,quiz_details
import json
from django.contrib import messages

# Create your views here.
def index(request):
    if request.method == "POST":
        if request.POST.get('name') and request.POST.get('password'):
            student = user()
            student.name = request.POST.get('name')
            student.password = request.POST.get('password')
            
            # load json data
            with open('login/static/user.json') as file_object:
                data = json.load(file_object)
            
            for detail in data['user']:
                if detail['userName']==student.name and detail['password']==student.password:
                    student.save()
                    return redirect('quiz')
            
            # error msg if data not matched
            messages.error(request,'Username or Password are incorrect')
    else:
        student = user()

    return render(request,'index.html')

def quiz(request):
    return render(request,'quiz.html')

def startquiz(request):
    if request.method == "POST":
        if request.POST.get("user_name") and request.POST.get("total_question") and request.POST.get("correct_answer") and request.POST.get("wrong_answer") and request.POST.get("message") and request.POST.get("time_taken"):
            details = quiz_details()
            details.user_name = request.POST.get("user_name")
            details.total_question = request.POST.get("total_question")
            details.correct_answer = request.POST.get("correct_answer")
            details.wrong_answer = request.POST.get("wrong_answer")
            details.message = request.POST.get("message")
            details.time_taken = request.POST.get("time_taken")
            details.save()
            # return redirect('index')
            return redirect('quiz')
    else:
        details = quiz_details()

    return render(request,'startquiz.html')