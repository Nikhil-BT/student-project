from django.urls import path
from . import views

urlpatterns = [
    path('addstudent',views.add_student_data,name = 'add_student_data'),
]