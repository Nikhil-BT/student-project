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

@api_view(['POST'])
def update_student_data(request):
    try:
        data = request.data
        print(data)
        if(Student.objects.filter(name = data['student_old_name']).exists()):
            Student.objects.filter(name = data['student_old_name']).update(
                name = data['student_new_name'],
                roll_number = data['student_new_rollno'],
                class_name = data['student_new_class'],
                div = data['student_new_div']
            )
            res = {
            'message': 'Student updated successfully'
            }
            return Response(res,200)

        else:
            res = {
                'message' : 'Student Not Found'
            }
            return Response(res,200)
    except:
        traceback.print_exc()

@api_view(['GET'])
def delete_student_data(request):
    try:
        if(Student.objects.filter(name = request.query_params['student_name']).exists()):
            Student.objects.filter(name = request.query_params['student_name']).delete()
            res = {
                'message' : 'student deleted successfully'
            }
            return Response(res,200)

        else:
            res = {
                'message' : 'student is not exists'
            }
            return Response(res,200)

    except:
        traceback.print_exc()

@api_view(['POST'])
def update_student_attendance(request):
    try: 
        data = request.data
        # student_id  = Student.objects.get(name = data['student_name']).id
        # print(student_id)
        if (Student.objects.filter(name = data['student_name']).exists()):
            Attendance_data.objects.create(
                days = data['student_attend_days'],
                month = data['month'],
                year = data['year'],
                student = Student.objects.get(name = data['student_name'])
                )
            res = {
                'message' : 'data saved successfully'
            }
            return Response(res,200)

        else:
            res = {
                'message' : 'student is not exists please enter valid student name'
            }
            return Response(res,200)
        
                                                                                                                                                                                                                                                                                                        
    except:
        traceback.print_exc()

@api_view(['GET'])
def get_student_data(request):
    try:
        students = Student.objects.all()
        studentserializer = StudentSerializer(students,many=True)
        print(studentserializer.data)
        res = {
            'students' : studentserializer.data
        }
        return Response(res,200)
    except:
        traceback.print_exc()