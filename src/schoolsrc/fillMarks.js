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


//Home Button Link///////////////////////////////////////
var homebtn=document.getElementById('about')
homebtn.addEventListener("click", function(){
  var queryString = "?" + session;
  window.location.href = "home.html" + queryString;
  console.log('opening fill student attendance page')
});

//Home Button Link////////////////////////////////////////

var studentDB = new PouchDB('studentdb');
var classDB = new PouchDB('classdb');

var localMDB = new PouchDB(session+'marksdb')
var remoteMDB = new PouchDB('http://localhost:5984/'+session+'marksdb');


var showbtn = document.getElementById('showbtn');
var classText = document.getElementById('classText');
var termText = document.getElementById('termText');
var secText = document.getElementById('secText');
var submitbtn = document.getElementById('submitbtn');
var marksTable = document.getElementById('marksTable');
var lockbtn = document.getElementById('lockbtn');
var sub = document.getElementById('sub');



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




showbtn.addEventListener("click",function()
{
  document.getElementById('lockbtn').disabled = false
    marksTable.innerHTML=""; 
    studentDB.createIndex({
        index: {
            fields: ['clas','section','stSID']
          }
    }).then(function(index) {	
        studentDB.find({
            selector: {
                clas:classText.value,
                section:secText.value,
                stSID:session
              }
        }).then(function(result) {
            console.log(result.docs.map(function(doc) {                  
             
             
              $("#marksTable").append("<tr><td data-label=\"ID\">"+doc.aadhaar+"</td> <td data-label=\"NAME\">"+doc.name+"</td><td data-label=\"MARKS\"><input type=\"number\" min=\"0\" max=\"100\" name=\"public\" id="+doc.aadhaar+">  </div> </div></td></tr>")  }));	
  

                
        });	
    });
 

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
  document.getElementById('submitbtn').disabled = false
    bulk=[];
    studentDB.createIndex({
        index: {
            fields: ['clas','section','stSID']
          }
    }).then(function(index) {	
        studentDB.find({
            selector: {
                clas:classText.value,
                section:secText.value,
                stSID:session
              }
        }).then(function(result) {
            console.log(result.docs.map(function(doc) {
    
            marksValue = document.getElementById(doc.aadhaar);
            subjectValue = value.value;
            console.log(subjectValue);
            elementum = null;
            elementum = {
              _id: new Date().toISOString()+doc.aadhaar,
              name:doc.name,
              aadhaar: doc.aadhaar,
              class:classText.value,
              section:secText.value,
              marks: marksValue.value,
              subject: subjectValue,
              term: termText.value
            };

            bulk.push(elementum)
            console.log(bulk)
          }));	   
        });	
    });
});

submitbtn.addEventListener("click",function(res,err)
{
  document.getElementById('submitbtn').disabled = true
  localMDB.bulkDocs(bulk).then((res,err) => {

    console.log("Documents inserted OK");
    var queryString = "?" + session;
    window.location.href = "fillMarks.html" + queryString;
    
   }).catch(() => {
    console.log(err);
  });
})



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