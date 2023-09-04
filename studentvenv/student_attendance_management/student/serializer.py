from rest_framework import serializers
from .models import Student,Attendance_data

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        models = Student
        feilds = '__all__'

class StudentAttendanceSerializer(serializers.ModelSerializer):
    class Meta:
        models = Attendance_data
        feilds = '__all__'
        