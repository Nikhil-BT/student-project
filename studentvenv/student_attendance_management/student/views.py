from django.shortcuts import render
from http.client import HTTPResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializer import StudentSerializer,StudentAttendanceSerializer
from .models import Student,Attendance_data
import json
import traceback
from django.db.models import Q

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
            # Attendance_data.objects.create(
            #     days = data['student_attend_days'],
            #     month = data['month'],
            #     year = data['year'],
            #     student = Student.objects.get(name = data['student_name'])
            #     )
            student_id = Student.objects.get(name = data['student_name']).id
            print(id)
            days = Attendance_data.objects.get(student = student_id,month = data['month'],year = data['year']).days
            print('before =',days)
            attendance = data['student_attend']
            print(attendance)
            if attendance == 'P':
                Attendance_data.objects.filter(student = student_id).update(
                    days =  days+1,

                )
            elif attendance == "AB":
                Attendance_data.objects.filter(student = student_id).update(
                    days =  days-1,

                )
            days = Attendance_data.objects.get(student = student_id,month = data['month'],year = data['year']).days
            print("after =",days)
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

@api_view(['POST'])
def filter_data(request):
    try:
        data = request.data
        # print(data)
        # name = Student.objects.filter().values_list('name')
        # print(name)
        name_filter = roll_no_filter = class_filter = div_filter = Q()
        if 'name' in data.keys():
            if data['name'] != '':
                if data['name'] == 'true':
                    # name = Student.objects.filter().values_list('name')
                    name_filter = Student.objects.all().order_by('name').values()
                    filter_serializer = StudentSerializer(name_filter,many = True)
                    students = filter_serializer.data
                    res = {
                        'message' : 'Filter applied successfully',
                        'students' : students
                        }
                    return Response(res,200)
                    # print('-------------------',name_filter)

                else:
                    # name = Student.objects.filter().values_list('name')
                    name_filter = Student.objects.all().order_by('-name').values()
                    filter_serializer = StudentSerializer(name_filter,many = True)
                    students = filter_serializer.data
                    res = {
                        'message' : 'Filter applied successfully',
                        'students' : students
                        }
                    return Response(res,200)
                    # print('-------------------',name_filter)
        if 'roll_no' in data.keys():
            if data['roll_no'] != '':
                if data['roll_no'] == 'true':
                    # roll_no = Student.objects.filter().values_list('roll_number')
                    roll_no_filter = Student.objects.all().order_by('roll_number').values()
                    filter_serializer = StudentSerializer(roll_no_filter,many = True)
                    students = filter_serializer.data
                    res = {
                        'message' : 'Filter applied successfully',
                        'students' : students
                        }
                    return Response(res,200)
                    # print('-------------------',roll_no_filter)
                else:
                    # roll_no = Student.objects.filter().values_list('roll_number')
                    roll_no_filter = Student.objects.all().order_by('-roll_number').values()
                    filter_serializer = StudentSerializer(roll_no_filter,many = True)
                    students = filter_serializer.data
                    res = {
                        'message' : 'Filter applied successfully',
                        'students' : students
                        }
                    return Response(res,200)
                    # print('-------------------',roll_no_filter)

        if 'class' in data.keys():
            if data['class'] != '':
                class_filter = Q(class_name = data['class'])
                print('---------',class_filter)

        if 'div' in data.keys():
            if data['div'] != '':
                div_filter = Q(div = data['div'])
                print('----------',div_filter)

        students = Student.objects.filter(class_filter &div_filter)
        filter_serializer = StudentSerializer(students,many = True)
        students = filter_serializer.data
        res = {
            'message' : 'Filter applied successfully',
            'students' : students
        }
        return Response(res,200)
    except:
        traceback.print_exc()

@api_view(['POST'])
def get_percentage_data(request):
    data = request.data
    print(data)
    student_id = Student.objects.get(name = data['student_name']).id
    #find all months and days for that student id
    #bakicha part js ne karaycha aahe

    res = {
        'message' : 'data recieved'
    }
    return Response(res,200)