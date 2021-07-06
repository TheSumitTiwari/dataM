var PouchDB = require('pouchdb');
PouchDB.plugin(require('pouchdb-find'));
var session=""

var schooldb = new PouchDB('schooldb');
var blockdb = new PouchDB('blockdb');
var districtdb = new PouchDB('districtdb');
var teacherdb = new PouchDB('teacherdb');
var studentdb = new PouchDB('studentdb');
var classdb = new PouchDB('classdb');

var rschooldb = new PouchDB('http://localhost:5984/schooldb');
var rblockdb = new PouchDB('http://localhost:5984/blockdb');
var rdistrictdb = new PouchDB('http://localhost:5984/districtdb');
var rteacherdb = new PouchDB('http://localhost:5984/teacherdb');
var rstudentdb = new PouchDB('http://localhost:5984/studentdb');
var rclassdb = new PouchDB('http://localhost:5984/classdb');


var queryString = decodeURIComponent(window.location.search);
  queryString = queryString.substring(1);
  var queries = queryString.split("&");
  for (var i = 0; i < queries.length; i++)
  {
   session= queries[i];
  }


// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<DashBoard>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

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


var showStAtt = document.getElementById('sStAt');
var showMarks = document.getElementById('sMarks');
var resultShow = document.getElementById('result');
var showTeaAtt = document.getElementById('sTeaAtt');
var showProfile = document.getElementById('showProfile');
var signoutbtn = document.getElementById('signout');


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


  

// var localADB = new PouchDB(session+'attenddb')
// var localMDB = new PouchDB(session+'marksdb')

// var remoteADB = new PouchDB('http://localhost:5984/'+session+'attenddb');
// var remoteMDB = new PouchDB('http://localhost:5984/'+session+'marksdb');



// localADB.info().then(function (info) {
//       console.log(info);
//   });
// localMDB.info().then(function (info) {
//     console.log(info);
// });
// remoteADB.info().then(function (info) {
//   console.log(info);
// });
// remoteMDB.info().then(function (info) {
// console.log(info);
// });



////----------------------------------------------------sync--------------------------------
// localADB.sync(remoteADB, {
//   live: true,
//   retry: true
// }).on('change', function (change) {
//   console.log(change);
// }).on('paused', function (info) {
//   console.log(info);
// }).on('active', function (info) {
//   console.log(info);
// }).on('error', function (err) {
//   console.log(err);
// });
// localMDB.sync(remoteMDB, {
//   live: true,
//   retry: true
// }).on('change', function (change) {
//   console.log(change);
// }).on('paused', function (info) {
//   console.log(info);
// }).on('active', function (info) {
//   console.log(info);
// }).on('error', function (err) {
//   console.log(err);
// });

schooldb.sync(rschooldb, {
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
blockdb.sync(rblockdb, {
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
districtdb.sync(rdistrictdb, {
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
teacherdb.sync(rteacherdb, {
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
studentdb.sync(rstudentdb, {
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
classdb.sync(rclassdb, {
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

