var Chart= require('chart.js')
var PouchDB = require('pouchdb');
PouchDB.plugin(require('pouchdb-find'));
const jsPDF = require('jspdf');
var doc = new jsPDF()
var session=""



var classDB = new PouchDB('classdb');

var labelum=['0-10','11-20','21-30','31-40','41-50','51-60','61-70','71-80','81-90','91-100'];
var datum=[0,0,0,0,0,0,0,0,0,0];



var queryString = decodeURIComponent(window.location.search);
  queryString = queryString.substring(1);
  var queries = queryString.split("&");
  for (var i = 0; i < queries.length; i++)
  {
   session= queries[i];
  }


  var showbtn = document.getElementById('showbtn');
  var classText = document.getElementById('classText');
  var termText = document.getElementById('termText');
  var secText = document.getElementById('secText');
  var submitbtn = document.getElementById('submitbtn');
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




lockbtn.addEventListener("click", function(){
     datum=[0,0,0,0,0,0,0,0,0,0];
     document.getElementById('submitbtn').disabled = false
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
          
          },
    }).then(function(result) {
        console.log(result.docs.map(function(doc) {
    
        if(doc.marks<=100 && doc.marks>90){
            datum[9]++
        }
        if(doc.marks<=90 && doc.marks>80){
            datum[8]++
        }
        if(doc.marks<=80 && doc.marks>70){
            datum[7]++
        }
        if(doc.marks<=70 && doc.marks>60){
            datum[6]++
        }
        if(doc.marks<=60 && doc.marks>50){
            datum[5]++
        }
        if(doc.marks<=50 && doc.marks>40){
            datum[4]++
        }
        if(doc.marks<=40 && doc.marks>30){
            datum[3]++
        }
        if(doc.marks<=30 && doc.marks>20){
            datum[2]++
        }
        if(doc.marks<=20 && doc.marks>10){
            datum[1]++
        }
        if(doc.marks<=10 && doc.marks>0){
            datum[0]++
        }           
        console.log(datum)
        console.log(labelum)

          }));	

            
    });	
});

  

})


submitbtn.addEventListener("click",function()
{
    document.getElementById('saveAspdf').disabled = false
    console.log("graph processed")
    var ctx1 = document.getElementById('myChart1').getContext('2d');
    var myBarChart = new Chart(ctx1, {
      type: 'bar',
        data: {
            labels:labelum,
            datasets: [{
                label: '# of Students',
                data: datum,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
});

saveAspdf.addEventListener("click",function()
      {            
        var canvas = document.querySelector("#myChart1");
        var canvas_img = canvas.toDataURL("image/png",1.0); //JPEG will not match background color
        var pdf = new jsPDF('landscape','in', 'letter'); //orientation, units, page size
        pdf.addImage(canvas_img, 'png', .5, 1.75, 10, 5); //image, type, padding left, padding top, width, height
        pdf.autoPrint(); //print window automatically opened with pdf
        var blob = pdf.output("bloburl");
        window.open(blob);            
      }) 
          

})