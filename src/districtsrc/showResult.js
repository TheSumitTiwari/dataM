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

iter = 1

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
  window.location.href = "districtHome.html" + queryString;
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
var studentdb = new PouchDB('studentdb');
var blockDB = new PouchDB('blockdb')


var showBbtn = document.getElementById('showBbtn');
var showSbtn = document.getElementById('showSbtn');
var submitbtn = document.getElementById('submitbtn');
var lockbtn = document.getElementById('lockbtn');

showBbtn.addEventListener("click",function()
{
  document.getElementById('showSbtn').disabled = false

blockDB.createIndex({
    index: {
        fields: ['udid']
      }
}).then(function(index) {	
    blockDB.find({
        selector: {            
            udid:session
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

var schoolvar =""

lockbtn.addEventListener("click",function(res,err)
{
  document.getElementById('showStbtn').disabled = false
  schoolvar= document.getElementById('schoolID').value;
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

showStbtn.addEventListener("click",function()
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
                stSID:schoolvar
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
  
  document.getElementById('showStbtn').disabled = true
  document.getElementById('submitbtn').disabled = true
  
})