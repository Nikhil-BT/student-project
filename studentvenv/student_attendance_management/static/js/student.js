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
    let studentNewClass = document.getElementById('updatestudentclass').value
    let studentNewDiv = document.getElementById('updatestudentdiv').value

    if (studentOldName && studentNewName && studentNewRollNo && studentNewClass && studentNewDiv){
        const data = {
            'student_old_name' : studentOldName,
            'student_new_name' : studentNewName,
            'student_new_rollno': studentNewRollNo,
            'student_new_class' : studentNewClass,
            'student_new_div': studentNewDiv
        }
        $.ajax({
            type : 'POST',
            url : 'http://127.0.0.1:8000/student/updatestudent',
            data : JSON.stringify(data),
            contentType : 'application/json',
            success : function(res){
                alert(res.message)
            },
            error: (err) =>{
                console.log(err)
            }
        })
    }
}

function deleteStudent(){
    let studentName = document.getElementById('deletestudentname').value
    if(studentName){
        $.ajax({
            type : 'GET',
            url : 'http://127.0.0.1:8000/student/deletestudent',
            data : {
                'student_name' : studentName
            },
            success : (res) => {
                alert(res)
            },
            error : (err) => {
                console.log(err)
            }
        })
    }
}

function updateAttendance(){
    let studentName = document.getElementById('attendstudentname').value
    let studentAttendDays = Number(document.getElementById('attenddays').value)
    // console.log(typeof(studentAttendDays))
    let studentAttendMonth = document.getElementById('attendmonth').value
    let year = studentAttendMonth.slice(0,4)
    let month = studentAttendMonth.slice(-2)
    // console.log(studentAttendMonth)
    // console.log(month)
    // console.log(year)
    if (studentName && studentAttendDays && studentAttendMonth){
        if(studentAttendDays <= 26){
            const data = {
                'student_name' : studentName,
                'student_attend_days' : studentAttendDays,
                'month' : month,
                'year' : year
            }
            $.ajax({
                type : 'POST',
                url : 'http://127.0.0.1:8000/student/attendance',
                data : JSON.stringify(data),
                contentType : 'application/json',
                success : (res) => {
                    alert(res.message)
                },
                error : (err) =>{
                    console.log(err)
                }

            })
        }else{
            alert('please enter valid present days per month')
        }
    
    }else{
        alert('please enter all the fields')
    }

}

// getting th student data by calling GET api method

function getStudentData(){
    return $.ajax({
        type : "GET",
        url : 'http://127.0.0.1:8000/student/getstudentdata',
        success : res => {
            console.log(res.students)
        },
        error: (err) => {
            console.log(err)
        }

})}

function showTable(students){
    const studentTable = document.getElementById('tablebody')
    for (let i = 0 ; i< students.length ; i++){
        let row = studentTable.insertRow()
        let cell0 = row.insertCell();
        let cell1 = row.insertCell();
        let cell2 = row.insertCell();
        let cell3 = row.insertCell();
        cell0.innerHTML = `${students[i].name}`
        cell1.innerHTML = `${students[i].roll_number}`
        cell2.innerHTML = `${students[i].class_name}`
        cell3.innerHTML = `${students[i].div}`

    }

}
function renderStudentTable (){
    getStudentData().then((res) => {
        const students = res.students
        removeStudentTable()
        showTable(students)
    })
}

function removeStudentTable(){
    const studentTable = document.getElementById('tablebody')
    studentTable.innerHTML = ''
    
}

function filterTable(){
    
}