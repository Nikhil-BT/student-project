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
    let studentAttendDays = document.getElementById('attendance').value
    // console.log(typeof(studentAttendDays))
    let studentAttendMonth = document.getElementById('attendmonth').value
    let year = studentAttendMonth.slice(0,4)
    let month = studentAttendMonth.slice(-2)
    // console.log(studentAttendMonth)
    // console.log(month)
    // console.log(year)
    if (studentAttendDays === null ){
        alert('please fill the attendance data')
    }
    if (studentName && studentAttendDays && studentAttendMonth){
        
            const data = {
                'student_name' : studentName,
                'student_attend' : studentAttendDays,
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
    let nameFilter = document.getElementById('Name').value
    let rollNoFilter = document.getElementById('Roll_no').value
    let classFilter = document.getElementById('classname').value
    let divFilter = document.getElementById('Div').value

    if(nameFilter === '' && rollNoFilter === '' && classFilter === '' && divFilter === '') {
        alert('please select option to apply filter')
        return
    }
    if(nameFilter !== '' && rollNoFilter !== '' && classFilter !== '' && divFilter !== '') {
        alert('do not selest all the options')
        return
    }
    if(nameFilter !== '' && rollNoFilter === '' && classFilter === '' && divFilter === '') {
        sendFilterData(nameFilter,rollNoFilter,classFilter,divFilter)
    }
    if(nameFilter === '' && rollNoFilter !== '' && classFilter === '' && divFilter === '') {
        sendFilterData(nameFilter,rollNoFilter,classFilter,divFilter)
    }
    if(nameFilter === '' && rollNoFilter === '' && classFilter !== '' || divFilter !== '') {
        sendFilterData(nameFilter,rollNoFilter,classFilter,divFilter)
    }
    
    

}

function sendFilterData(nameFilter,rollNoFilter,classFilter,divFilter){
    const data = {
        'name' : nameFilter,
        'roll_no' : rollNoFilter,
        'class' : classFilter,
        'div' : divFilter
    }
    $.ajax({
        type : 'POST',
        url : 'http://127.0.0.1:8000/student/filter',
        data : JSON.stringify(data),
        contentType : 'application/json',
        success : (res) => {
            console.log(res.message)
            const students = res.students 
            removeStudentTable()
            showTable(students)
        },
        error : (err) => {
            console.log(err)
        }
    })
}
function sendPercTableData(){
    const studentName = document.getElementById('percentagestudentname').value
    const yearOfPercentage = document.getElementById('percentagestudentyear').value
    const data = {
        'name' : studentName,
        'year' : yearOfPercentage
    }
    $.ajax({
        type : 'POST',
        url : 'http://127.0.0.1:8000/student/percentagedata',
        data : JSON.stringify(data),
        contentType : 'application/json',
        success : (res) => {
            
        },
        error : (err) => {
            console.log(err)
        }

    })
}

function displayPercentageTable(){
    const dTable = document.getElementById('percentagetable')
    dTable.classList.contains('d-none') ? dTable.classList.remove("d-none") : ''
    const vTable = document.getElementById('resetbutton')
    vTable.classList.contains("d-none") ? vTable.classList.remove("d-none") : ''
    sendPercTableData().then((res) => {
        const percTableData = res.data
        console.log(percTableData)
    })
    
    // console.log(studentName)
    // console.log(yearOfPercentage)
    

    
    

}
function vanishPercentageTable(){
    const dTable = document.getElementById('percentagetable')
    dTable.classList.contains('d-none') ? '' : dTable.classList.add("d-none")
    const vTable = document.getElementById('resetbutton')
    vTable.classList.contains("d-none") ? '' : vTable.classList.add("d-none")
}

