from django.urls import path
from . import views

urlpatterns = [
    path('addstudent',views.add_student_data,name = 'add_student_data'),
    path('updatestudent',views.update_student_data,name = 'update_student_data'),
    path('deletestudent',views.delete_student_data,name = 'delete_student_data'),
    path('attendance',views.update_student_attendance, name = 'update_student_attendance'),
    path('getstudentdata',views.get_student_data,name = 'get_student_data'),
]