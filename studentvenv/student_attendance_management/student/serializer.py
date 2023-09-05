from rest_framework import serializers
from .models import Student,Attendance_data

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = '__all__'

class StudentAttendanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attendance_data
        fields = '__all__'
        