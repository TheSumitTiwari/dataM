var Chart= require('chart.js')
var PouchDB = require('pouchdb');
PouchDB.plugin(require('pouchdb-find'));
var session=""


var labelum=['','','','','','','','','',''];
var datum=[0,0,0,0,0,0,0,0,0,0];
var barBG=[0,0,0,0,0,0,0,0,0,0];
var iter=1;


var queryString = decodeURIComponent(window.location.search);
  queryString = queryString.substring(1);
  var queries = queryString.split("&");
  for (var i = 0; i < queries.length; i++)
  {
   session= queries[i];
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




var studentdb = new PouchDB('studentdb')
var localMDB = new PouchDB(session+'marksdb')
var remoteMDB = new PouchDB('http://localhost:5984/'+session+'marksdb');

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


// <<<<<<<<<<<<<<<<GRAPH CODE>>>>>>>>>>>>>>>>




showbtn.addEventListener("click",function()
{
  document.getElementById('submitbtn').disabled = false
  
  stuname.innerHTML=""; 
  studentdb.createIndex({
      index: {
          fields: ['clas','section','stSID']
        }
  }).then(function(index) {	
      studentdb.find({
          selector: {
              clas:classText.value,
              section:secText.value,
              stSID:session
            }          
      }).then(function(result) {
          console.log(result.docs.map(function(doc) {
             
                  $("#stuname").append("<option id =\"01\" value="+doc.aadhaar+">"+doc.name+"</option>")
                                   
          }));	
        });	
     });
})




submitbtn.addEventListener("click", function(){

  document.getElementById('saveAsExl').disabled = false
  document.getElementById('saveAspdf').disabled = false
  datum=[0,0,0,0,0,0,0,0,0,0];
localMDB.createIndex({
    index: {
        fields: ['class','section','term','aadhaar']
      }
}).then(function(index) {	
    localMDB.find({
        selector: {
            class:classText.value,
            section:secText.value,
            term:termText.value,
            aadhaar:stuname.value
          
          },
    }).then(function(result) {
        console.log(result.docs.map(function(doc) {
    
       
          $("#marksTable").append("<tr><td data-label=\"Sr.No.\">"+iter+"</td> <td data-label=\"Subject\">"+doc.subject+"</td><td data-label=\"MARKS\"> "+doc.marks+" </div> </div></td></tr>") 
           iter += 1
          // datum[iter]=doc.marks;
          // labelum[iter]=doc.subject;
          // barBG[iter]='rgba('+iter*25+', 99, '+(iter*10+100)+', 0.2)';
          //       iter+=1;
          //   console.log(datum)
          //   console.log(labelum)
          }));	
    });	
});

saveAsExl.addEventListener("click", function(){
  $(".Excell").table2excel({
   exclude: ".noEXL",
   name: "result",
   filename: "result.xls", // do include extension
   preserveColors: false // set to true if you want background colors and font colors preserved
  })
});

saveAspdf.addEventListener("click",function()
{
  
  var cmpltBody = document.body.innerHTML;
  var pdf =document.getElementById("pdf").innerHTML;
  document.body.innerHTML = pdf;
  window.print();
  document.body.innerHTML = cmpltBody

})

})

