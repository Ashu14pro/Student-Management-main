
  const form = document.getElementById('student-form');
  const tableBody = document.querySelector('#student-table tbody');
  const students = JSON.parse(localStorage.getItem('students')) || [];

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const studentName = document.getElementById('student-name').value.trim();
    const studentId = document.getElementById('student-id').value.trim();
    const emailId = document.getElementById('email-id').value.trim();
    const contactNo = document.getElementById('contact-no').value.trim();
    
    if (!studentName || !studentId || !emailId || !contactNo) {
      alert('All fields are required!');
      return;
    }

    const newStudent = { studentName, studentId, emailId, contactNo };
    students.push(newStudent);
    localStorage.setItem('students', JSON.stringify(students));

    addStudentToTable(newStudent);
    form.reset();
  });

  function addStudentToTable(student) {
    const row = document.createElement('tr');
    
    row.innerHTML = `
      <td>${student.studentName}</td>
      <td>${student.studentId}</td>
      <td>${student.emailId}</td>
      <td>${student.contactNo}</td>
      <td>
        <button class="edit-btn">Edit</button>
        <button class="delete-btn">Delete</button>
      </td>
    `;

    tableBody.appendChild(row);

    row.querySelector('.delete-btn').addEventListener('click', function() {
      const index = students.indexOf(student);
      students.splice(index, 1);
      localStorage.setItem('students', JSON.stringify(students));
      tableBody.removeChild(row);
    });
    
    row.querySelector('.edit-btn').addEventListener('click', function() {
      document.getElementById('student-name').value = student.studentName;
      document.getElementById('student-id').value = student.studentId;
      document.getElementById('email-id').value = student.emailId;
      document.getElementById('contact-no').value = student.contactNo;
    });
  }

  students.forEach(addStudentToTable);

