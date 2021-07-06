var Chart= require('chart.js')
var PouchDB = require('pouchdb');
PouchDB.plugin(require('pouchdb-find'));
const jsPDF = require('jspdf');
var doc = new jsPDF()
var session=""


var labelum=['','','','','','','','','',''];
var datum=[0,0,0,0,0,0,0,0,0,0];
var barBG=[0,0,0,0,0,0,0,0,0,0];
var iter=0;


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
  var lockbtn = document.getElementById('lockbtn');
  var submitbtn = document.getElementById('submitbtn');
  var stuname = document.getElementById('stuname');
  

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




lockbtn.addEventListener("click", function(){

    document.getElementById('submitbtn').disabled = false
    datum=[0,0,0,0,0,0,0,0,0,0];
    iter=0;
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
        
          datum[iter]=doc.marks;
          labelum[iter]=doc.subject;
          barBG[iter]='rgba('+iter*25+', 99, '+(iter*10+100)+', 0.2)';
                iter+=1;
            console.log(datum)
            console.log(labelum)
    
              }));	
    
                
        });	
    });

})

var myBarChart 
var ctx1
submitbtn.addEventListener("click",function()
{

  document.getElementById('saveAspdf').disabled = false
    console.log("graph processed")
 ctx1 = document.getElementById('myChart1').getContext('2d');
 myBarChart = new Chart(ctx1, {
  type: 'bar',
    data: {
        labels:labelum,
        datasets: [{
            label: labelum,
            data: datum,
            backgroundColor: barBG,
            borderColor:barBG,
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