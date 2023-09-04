'use strict';

function addStudent(){
    let studentName = document.getElementById('studentname').value
    let studentRollno = document.getElementById('studentrollno').value
    let studentClass = document.getElementById('studentclass').value
    let studentDiv = document.getElementById('studentdiv').value
    console.log(typeof(studentDiv))
    let div = ['A','B','a','b']

    

    if (studentName && studentRollno && studentClass && studentDiv){
        // alert('done')
        // console.log(studentDiv)
        if(studentRollno <= 100 && 10>=studentClass>0 && div.includes(studentDiv)){
            const data = {
                'student_name' : studentName,
                'student_rollno' : studentRollno,
                'student_class' : studentClass,
                'student_div' : studentDiv
            }
            $.ajax({
                type: 'POST',
                url : 'http://127.0.0.1:8000/student/addstudent',
                data : JSON.stringify(data),
                contentType : 'application/json',
                success : function(res){
                    alert(res.message)
                },
                error: (err) => {
                    console.log(err)
                }
            })

        }else{
            alert('some feild not match the condition')
        }
        
    }else{
        alert('please enter all the values')
    }
   
}

function updateStudent(){
    let studentOldName = document.getElementById('updateoldstudentname').value
    let studentNewName = document.getElementById('updatenewstudentname').value
    let studentNewRollNo = document.getElementById('updatestudentrollno').value
    let studentNewStudentClass = document.getElementById('updatestudentclass').value
    let studentNewDiv = document.getElementById('updatestudentdiv').value

    if (studentOldName && studentNewName && studentNewRollNo && studentNewStudentClass && studentNewDiv){
        pass
    }
}