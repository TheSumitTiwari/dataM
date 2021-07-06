var PouchDB = require('pouchdb');
PouchDB.plugin(require('pouchdb-find'));
var session=''
var localADB;
var remoteADB;
var queryString = decodeURIComponent(window.location.search);
queryString = queryString.substring(1);
var queries = queryString.split("&");
for (var i = 0; i < queries.length; i++)
{
 session = queries[i];
}


var schoolDB = new PouchDB('schooldb');


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
  window.location.href = "blockHome.html" + queryString;
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


showSbtn.addEventListener("click",function()
{
  document.getElementById('lockbtn').disabled = false
schoolDB.createIndex({
    index: {
        fields: ['ubid']
      }
}).then(function(index) {	
    schoolDB.find({
        selector: {            
            ubid:session
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
  document.getElementById('submitbtn').disabled = false
  var schoolvar= document.getElementById('schoolID').value;
  localADB = new PouchDB(schoolvar+'attenddb')                            // it save that school data in local database
  remoteADB = new PouchDB('http://localhost:5984/'+schoolvar+'attenddb');
  
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

})

submitbtn.addEventListener("click",function()
{
  document.getElementById('saveAsExl').disabled = false
  document.getElementById('submitbtn').disabled = true
  attable.innerHTML=""; 
  localADB.createIndex({
      index: {
          fields: ['class','section']
        }
  }).then(function(index) {	
      localADB.find({
          selector: {
              class:classText.value,
              section:secText.value,
              date:dateText.value
            }
      }).then(function(result) {
          console.log(result.docs.map(function(doc) {                  
           
           
            $("#attable").append("<tr><td data-label=\"ID\">"+doc.aadhaar+"</td> <td data-label=\"NAME\">"+doc.name+"</td><td data-label=\"MARKS\"> "+doc.attendance+" </div> </div></td></tr>")  }));	
             
      });	
  });

  saveAsExl.addEventListener("click", function(){
    var filename = "attend-"+document.getElementById('schoolID').value+"-"+classText.value+"-"+secText.value+"-"+dateText.value+".xls"
    console.log(filename)
    $(".Excell").table2excel({
     exclude: ".noEXL",
     name: "result",
     filename: filename, // do include extension
     preserveColors: false // set to true if you want background colors and font colors preserved
    })
  })

});

