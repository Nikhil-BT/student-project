from django.db import models


# Create your models here.


class Student(models.Model):
    name = models.CharField(max_length=100, null=True)
    roll_number = models.IntegerField(null=True)
    class_name = models.IntegerField(null=True)
    div = models.CharField(max_length = 50,null=True)

    def __str__(self):
        return self.name

class Attendance_data(models.Model):
    days = models.IntegerField(null=True)
    month = models.IntegerField(null=True)
    year = models.IntegerField(null = True)
    student = models.ForeignKey(Student,null = True,on_delete = models.CASCADE)


    

