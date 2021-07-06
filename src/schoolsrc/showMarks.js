var PouchDB = require('pouchdb');
PouchDB.plugin(require('pouchdb-find'));
var session=''

var queryString = decodeURIComponent(window.location.search);
queryString = queryString.substring(1);
var queries = queryString.split("&");
for (var i = 0; i < queries.length; i++)
{
 session = queries[i];
}

//===============================================headers================================================

var userlabel = document.getElementById('userlabel');
userlabel.innerHTML = session;

var fileuploadpage=document.getElementById('fileUpload')
fileuploadpage.addEventListener("click", function(){
  var queryString = "?" + session;
  window.location.href = "fileU.html" + queryString;
  console.log('opening fill student attendance page')
});
var graph1=document.getElementById('graph1page')
graph1.addEventListener("click", function(){
  var queryString = "?" + session;
  window.location.href = "graph1.html" + queryString;
  console.log('opening fill student attendance page')
});
var graph2=document.getElementById('graph2page')
graph2.addEventListener("click", function(){
  var queryString = "?" + session;
  window.location.href = "graph2.html" + queryString;
  console.log('opening fill student attendance page')
});
var graph3=document.getElementById('graph3page')
graph3.addEventListener("click", function(){
  var queryString = "?" + session;
  window.location.href = "graph3.html" + queryString;
  console.log('opening fill student attendance page')
});
var graph4=document.getElementById('graph4page')
graph4.addEventListener("click", function(){
  var queryString = "?" + session;
  window.location.href = "graph4.html" + queryString;
  console.log('opening fill student attendance page')
});

var homebtn=document.getElementById('about')
homebtn.addEventListener("click", function(){
  var queryString = "?" + session;
  window.location.href = "home.html" + queryString;
  console.log('opening fill student attendance page')
});


var fillStAtt = document.getElementById('fStAt');
var showStAtt = document.getElementById('sStAt');
var updateStAtt = document.getElementById('uStAt');
var fillMarks = document.getElementById('fMarks');
var updateMarks = document.getElementById('uMarks');
var showMarks = document.getElementById('sMarks');
var resultShow = document.getElementById('result');
var fillTeaAtt = document.getElementById('fTeaAtt');
var showTeaAtt = document.getElementById('sTeaAtt');
var updateTeaAtt = document.getElementById('uTeaAtt');
var graphPage = document.getElementById('graphPage');
var createProfile = document.getElementById('createProfile');
var showProfile = document.getElementById('showProfile');
var signoutbtn = document.getElementById('signout');

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<DashBoard>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

fillStAtt.addEventListener("click", function(){
  var queryString = "?" + session;
  window.location.href = "fillStudentAttendance.html" + queryString;
  console.log('opening fill student attendance page')
});

showStAtt.addEventListener("click", function(){
  var queryString = "?" + session;
  window.location.href = "showStudentAttendance.html" + queryString;
  console.log('opening show student attendance page')
});

updateStAtt.addEventListener("click", function(){
  var queryString = "?" + session;
  window.location.href = "updateStudentAttendance.html" + queryString;
  console.log('opening show student attendance page')
});

fillMarks.addEventListener("click", function(){
  var queryString = "?" + session;
  window.location.href = "fillMarks.html" + queryString;
  console.log('opening show student attendance page')
});


updateMarks.addEventListener("click", function(){
  var queryString = "?" + session;
  window.location.href = "updateMarks.html" + queryString;
  console.log('opening show student attendance page')
});


showMarks.addEventListener("click", function(){
  var queryString = "?" + session;
  window.location.href = "showMarks.html" + queryString;
  console.log('opening show student attendance page')
});


resultShow.addEventListener("click", function(){
  var queryString = "?" + session;
  window.location.href = "showResult.html" + queryString;
  console.log('opening show student attendance page')
});

fillTeaAtt.addEventListener("click", function(){
  var queryString = "?" + session;
  window.location.href = "fillTeacherAttendance.html" + queryString;
  console.log('opening show student attendance page')
});

showTeaAtt.addEventListener("click", function(){
  var queryString = "?" + session;
  window.location.href = "showTeacherAttendance.html" + queryString;
  console.log('opening show student attendance page')
});

updateTeaAtt.addEventListener("click", function(){
  var queryString = "?" + session;
  window.location.href = "updateTeacherAttendance.html" + queryString;
  console.log('opening show student attendance page')
});

graphPage.addEventListener("click", function(){
  var queryString = "?" + session;
  window.location.href = "graph.html" + queryString;
  console.log('opening show student attendance page')
});


createProfile.addEventListener("click", function(){
  var queryString = "?" + session;
  window.location.href = "createStudentProfile.html" + queryString;
  console.log('opening show student attendance page')
});


showProfile.addEventListener("click", function(){
  var queryString = "?" + session;
  window.location.href = "showStudentProfile.html" + queryString;
  console.log('opening show student attendance page')
});

signoutbtn.addEventListener("click", function(){
  var queryString = "?" + session;
  window.location.href = "../index.html" + queryString;
  console.log('opening show student attendance page')
});
//--------------------------------------------------------headersss-------------------------------------------

var localMDB = new PouchDB(session+'marksdb')
var remoteMDB = new PouchDB('http://localhost:5984/'+session+'marksdb');
var classDB = new PouchDB('classdb');

showbtn.addEventListener("click",function()
{
  document.getElementById('lockbtn').disabled = false
  sub.innerHTML=""; 
classDB.createIndex({
    index: {
        fields: ['name']
      }
}).then(function(index) {	
    classDB.find({
        selector: {
            name:classText.value
          }          
    }).then(function(result) {
        console.log(result.docs.map(function(doc) {
            if(doc.subject1 !== null){
                $("#sub").append("<option id =\"01\" value="+doc.subject1+">"+doc.subject1+"</option>")
            }
            
            if(doc.subject2 !== null){
                $("#sub").append("<option id =\"02\" value="+doc.subject2+">"+doc.subject2+"</option>")
            }

            if(doc.subject3 !== null){
                $("#sub").append("<option id =\"03\" value="+doc.subject3+">"+doc.subject3+"</option>")
            }

            if(doc.subject4 !== null){
                $("#sub").append("<option id =\"04\" value="+doc.subject4+">"+doc.subject4+"</option>")
            }

            if(doc.subject5 !== null){
                $("#sub").append("<option id =\"05\" value="+doc.subject5+">"+doc.subject5+"</option>")
            }           
        }));	
      });	
   });
})

var value = document.getElementById('sub')
var subjectValue;
var marksValue;
var elementum;
var bulk=[];

lockbtn.addEventListener("click",function()
{
  document.getElementById('lockbtn').disabled = true
  document.getElementById('saveAsExl').disabled = false
  console.log(sub.value)
  marksTable.innerHTML=""; 
  localMDB.createIndex({
      index: {
          fields: ['class','section','term','subject']
        }
  }).then(function(index) {	
      localMDB.find({
          selector: {
              class:classText.value,
              section:secText.value,
              term:termText.value,
              subject:sub.value
            }
      }).then(function(result) {
          console.log(result.docs.map(function(doc) {                  
           
           
            $("#marksTable").append("<tr><td data-label=\"ID\">"+doc.aadhaar+"</td> <td data-label=\"NAME\">"+doc.name+"</td><td data-label=\"MARKS\"> "+doc.marks+" </div> </div></td></tr>")  }));	

      });	
  });

  saveAsExl.addEventListener("click", function(){
    var filename = "attend-"+session+"-"+classText.value+"-"+secText.value+".xls"
    $(".Excell").table2excel({
     exclude: ".noEXL",
     name: "result",
     filename: filename, // do include extension
     preserveColors: false // set to true if you want background colors and font colors preserved
    })
  });

});



localMDB.sync(remoteMDB, {
  live: true,
  retry: true
}).on('change', function (change) {
  console.log(change);
}).on('paused', function (info) {
  console.log(info);
}).on('active', function (info) {
  console.log(info);
}).on('error', function (err) {
  console.log(err);
});