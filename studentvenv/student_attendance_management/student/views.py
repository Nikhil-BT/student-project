from django.shortcuts import render
from http.client import HTTPResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializer import StudentSerializer,StudentAttendanceSerializer
from .models import Student,Attendance_data
import json
import traceback

# Create your views here.

@api_view(['POST'])
def add_student_data(request):
    try:
        data = request.data
        print(data)
        if (Student.objects.filter(name = data['student_name']).exists()):
            res = {
              'message' : 'Student already exists'
            }
            return Response(res,400)
        else:
            Student.objects.create(
                name = data['student_name'],
                roll_number = data['student_rollno'],
                class_name = data['student_class'],
                div = data['student_div']
                )
            res = {
            'message' : 'data added successfully'
            }
            return Response(res,200)
    except:
        traceback.print_exc()

