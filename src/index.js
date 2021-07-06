

const loginbtn = document.getElementById('loginbtn')
const signupbtn = document.getElementById('signupbtn')
const attanbtn = document.getElementById('attanbtn')
const homebtn = document.getElementById('homebtn')
const studentbtn = document.getElementById('studentbtn')
const databtn = document.getElementById('databtn')


loginbtn.addEventListener("click",function(){
window.location.replace("login.html");
})
signupbtn.addEventListener("click",function(){
    window.location.replace("signup.html");
})
attanbtn.addEventListener("click",function(){
  window.location.replace("attendance.html");
})
homebtn.addEventListener("click",function(){
  window.location.replace("blocksrc/blockhome.html");
})

studentbtn.addEventListener("click",function(){
  window.location.replace("student.html");
})

databtn.addEventListener("click",function(){
  window.location.replace("dataInput.html");
})
