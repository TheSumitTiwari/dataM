var PouchDB = require('pouchdb');
PouchDB.plugin(require('pouchdb-find'));


var teacherDB = new PouchDB("teacherDB")

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
var localADB = new PouchDB(session+'Tattenddb')
var remoteADB = new PouchDB('http://localhost:5984/'+session+'tattenddb');



localADB.info().then(function (info) {
    console.log(info);
});
  
remoteADB.info().then(function (info) {
    console.log(info);
});




var attable = document.getElementById('attable') 
var cVal = document.getElementById('classVal');
var sVal = document.getElementById('sectionVal');
var dVal = document.getElementById('datepicker');
var showbtn = document.getElementById('showbtn');

var submitbtn = document.getElementById('submitbtn');
var lockbtn = document.getElementById('lockbtn');


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

showbtn.addEventListener("click", function(){
  console.log('opening show student attendance page')
  document.getElementById('lockbtn').disabled = false
    //attable.innerHTML=""; 
    
    teacherDB.createIndex({
        index: {
            fields: ['tSID']
          }
    }).then(function(index) {	
        teacherDB.find({
            selector: {
                tSID:session
              }
        }).then(function(result) {
            console.log(result.docs.map(function(doc) {
    
                console.log(doc.aadhaar+"  "+doc.name)
                          
              $("#attable").append("<tr><td data-label=\"ID\">"+doc.aadhaar+"</td> <td data-label=\"NAME\">"+doc.name+"</td><td data-label=\"ATT\"><div class=\"ui test toggle checkbox\"><input type=\"checkbox\" name=\"publi\" id="+doc.aadhaar+"><label class=\"dn\" for="+doc.aadhaar+" data-content=\"OFF\"></label>   </div> </div></td></tr>")  }));	

                
        });	
    });
})


var readAttend;
  var valAttend;
  var elementum;
  var bulk=[];
  lockbtn.addEventListener("click",function()
  {
    document.getElementById('submitbtn').disabled = false
      teacherDB.createIndex({
          index: {
              fields: ['tSID']
            }
      }).then(function(index) {	
          teacherDB.find({
              selector: {
                  tSID:session
                }
          }).then(function(result) {
              console.log(result.docs.map(function(doc) {
      
            readAttend = document.getElementById(doc.aadhaar);
              if(readAttend.checked){
                valAttend="Present"
              }
              else{
                valAttend="Absent"
              }
              elementum = null;
              elementum = {
                _id: new Date().toISOString()+doc.aadhaar,
                aadhaar: doc.aadhaar,
                date:dVal.value,
                attendance:valAttend,
                name:doc.name
              };

              bulk.push(elementum)

             
              
              console.log(bulk)
            }));	   
          });	
      });

      
  })
  submitbtn.addEventListener("click",function()
  {
    document.getElementById('lockbtn').disabled = true
    localADB.bulkDocs(bulk).then((res) => {

      console.log("Documents inserted OK");
      var queryString = "?" + session;
      window.location.href = "fillTeacherAttendance.html" + queryString;
     }).catch(() => {
      console.error(err);
    });
  })

  localADB.sync(remoteADB, {
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