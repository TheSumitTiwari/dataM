var PouchDB = require('pouchdb');
PouchDB.plugin(require('pouchdb-find'));
var session=''
var localMDB;
var remoteMDB;
var queryString = decodeURIComponent(window.location.search);
queryString = queryString.substring(1);
var queries = queryString.split("&");
for (var i = 0; i < queries.length; i++)
{
 session = queries[i];
}


// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<DashBoard>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


var showStAtt = document.getElementById('sStAt');
var showMarks = document.getElementById('sMarks');
var resultShow = document.getElementById('result');
var showTeaAtt = document.getElementById('sTeaAtt');
var showProfile = document.getElementById('showProfile');
var signoutbtn = document.getElementById('signout');

var userlabel = document.getElementById('userlabel');
userlabel.innerHTML = session;

var fileView=document.getElementById('fileView')
fileView.addEventListener("click", function(){
  var queryString = "?" + session;
  window.location.href = "fileV.html" + queryString;
});

var homebtn=document.getElementById('about')
homebtn.addEventListener("click", function(){
  var queryString = "?" + session;
  window.location.href = "stateHome.html" + queryString;
});

showStAtt.addEventListener("click", function(){
  var queryString = "?" + session;
  window.location.href = "showStudentAttendance.html" + queryString;
});

showMarks.addEventListener("click", function(){
  var queryString = "?" + session;
  window.location.href = "showMarks.html" + queryString;
});


resultShow.addEventListener("click", function(){
  var queryString = "?" + session;
  window.location.href = "showResult.html" + queryString;
});

showTeaAtt.addEventListener("click", function(){
  var queryString = "?" + session;
  window.location.href = "showTeacherAttendance.html" + queryString;
});

showProfile.addEventListener("click", function(){
  var queryString = "?" + session;
  window.location.href = "showStudentProfile.html" + queryString;
});

signoutbtn.addEventListener("click", function(){
  var queryString = "?" + session;
  window.location.href = "../index.html" + queryString;
});


//--------------------------------------------------------------------------------------------------

var schoolDB = new PouchDB('schooldb');
var classDB = new PouchDB('classdb');
var blockDB = new PouchDB('blockdb');
var districtDB = new PouchDB('districtdb');


showDbtn.addEventListener("click",function()
{
  
  document.getElementById('showBbtn').disabled = false

  districtDB.createIndex({
    index: {
        fields: ['usid']
      }
  }).then(function(index) {	
    districtDB.find({
        selector: {            
            usid:session
          }          
    }).then(function(result) {
        console.log(result.docs.map(function(doc) {
            
                $("#districtID").append("<option id =\"01\" value="+doc.udid+">"+doc.name+"</option>")

           }));	
      });	
   });
})


showBbtn.addEventListener("click",function()
{

  document.getElementById('showSbtn').disabled = false

  var districtvar = document.getElementById('districtID').value;
  blockDB.createIndex({
    index: {
        fields: ['udid']
      }
  }).then(function(index) {	
    blockDB.find({
        selector: {            
            udid:districtvar
          }          
    }).then(function(result) {
        console.log(result.docs.map(function(doc) {
            
                $("#blockID").append("<option id =\"01\" value="+doc.ubid+">"+doc.name+"</option>")

           }));	
      });	
   });
})



showSbtn.addEventListener("click",function()
{
 
  document.getElementById('lockbtn').disabled = false

  var blockvar= document.getElementById('blockID').value;
  schoolDB.createIndex({
    index: {
        fields: ['ubid']
      }
  }).then(function(index) {	
    schoolDB.find({
        selector: {            
            ubid:blockvar
          }          
    }).then(function(result) {
        console.log(result.docs.map(function(doc) {
            
                $("#schoolID").append("<option id =\"01\" value="+doc.sSID+">"+doc.name+"</option>")

           }));	
      });	
   });
})


lockbtn.addEventListener("click",function(res,err)
{

  document.getElementById("showsubbtn").disabled = false
  var schoolvar= document.getElementById('schoolID').value;
  localMDB = new PouchDB(schoolvar+'marksdb')
  remoteMDB = new PouchDB('http://localhost:5984/'+schoolvar+'marksdb');
  
  
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

})


showsubbtn.addEventListener("click",function()
{

  document.getElementById("submitbtn").disabled = false

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

submitbtn = document.getElementById("submitbtn")

submitbtn.addEventListener("click",function()
{
  document.getElementById('submitbtn').disabled = true
  document.getElementById('saveAsExcell').disabled = false
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
           
           
            $("#marksTable").append("<tr><td data-label=\"ID\">"+doc.aadhaar+"</td> <td data-label=\"NAME\">"+doc.name+"</td><td data-label=\"MARKS\"> "+doc.marks+" </div> </div></td></tr>")  
          }));	           
      });	
  });

  saveAsExl.addEventListener("click", function(){
    var filename = "attend-"+document.getElementById('schoolID').value+"-"+classText.value+"-"+secText.value+".xls"
    $(".Excell").table2excel({
     exclude: ".noEXL",
     name: "result",
     filename: filename, // do include extension
     preserveColors: false // set to true if you want background colors and font colors preserved
    })
  });

});

