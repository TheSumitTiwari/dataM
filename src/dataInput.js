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



var sname = document.getElementById('sname');
var tname = document.getElementById('tname');
var bname = document.getElementById('bname');
var dname = document.getElementById('dname');
var stname = document.getElementById('stname');
var cname = document.getElementById('cname');

var srole = document.getElementById('srole');
var trole = document.getElementById('trole');
var brole = document.getElementById('brole');
var drole = document.getElementById('drole');
var strole = document.getElementById('strole');

var sblock = document.getElementById('sblock');
var sdistrict = document.getElementById('sdistrict');
var sstate = document.getElementById('sstate');
var sSID = document.getElementById('sSID');

var bdistrict = document.getElementById('bdistrict');
var bstate = document.getElementById('bstate');

var dstate = document.getElementById('dstate');

var stschool = document.getElementById('stschool');
var stclass = document.getElementById('stclass');
var stsection = document.getElementById('stsection');
var stSID = document.getElementById('stSID');
var staadhaar = document.getElementById('staadhaar');
var taadhaar = document.getElementById('taadhaar');

var tschool = document.getElementById('tschool');
var tSID = document.getElementById('tSID');

var csubject1 = document.getElementById('csubject1');
var csubject2 = document.getElementById('csubject2');
var csubject3 = document.getElementById('csubject3');
var csubject4 = document.getElementById('csubject4');
var csubject5 = document.getElementById('csubject5');

var schoolbtn = document.getElementById('schoolbtn');
var blockbtn = document.getElementById('blockbtn');
var districtbtn = document.getElementById('districtbtn');
var studentbtn = document.getElementById('studentbtn');
var teacherbtn = document.getElementById('teacherbtn');
var classbtn = document.getElementById('classbtn');
var stubtn = document.getElementById('stubtn');
var teabtn = document.getElementById('teabtn');
var attendbtn = document.getElementById('attendbtn');
var fileS = document.getElementById('fileS');
var marksbtn = document.getElementById('marksbtn');
var graphbtn = document.getElementById('graphbtn');
var shbtn = document.getElementById('shbtn');





function schoolfunc(name,role,block,district,state,sSID) {
    var elementum = {
      _id: new Date().toISOString(),
      name: name,
      role:role,
      block:block,
      district:district,
      state:state,
      sSID:sSID
    };
    schooldb.put(elementum, function callback(err, result) {
      if (!err) {
        console.log('Successfully created a new school!');
        var attnd = new PouchDB('http://localhost:5984/'+sSID+'attenddb')
        attnd.info().then(function (info) {
              console.log(info);
          });

        var marks = new PouchDB('http://localhost:5984/'+sSID+'marksdb')
        marks.info().then(function (info) {
          console.log(info);
      });
      }
      else{console.log(err);}
    });
  }
  function blockfunc(name,role,district,state) {
    var elementum = {
      _id: new Date().toISOString(),
      name: name,
      role:role,
      district:district,
      state:state
    };
    blockdb.put(elementum, function callback(err, result) {
      if (!err) {
        console.log('Successfully created a new block!');
      }
      else{console.log(err);}
    });
  }
  function districtfunc(name,role,state) {
    var elementum = {
      _id: new Date().toISOString(),
      name: name,
      role:role,
      state:state
    };
    districtdb.put(elementum, function callback(err, result) {
      if (!err) {
        console.log('Successfully created a new district!');
      }
      else{console.log(err);}
    });
  }
  function studentfunc(name,role,school,clas,section,stSID,staadhaar) {
    var elementum = {
      _id: new Date().toISOString(),
      name: name,
      role:role,
      school:school,
      clas:clas,
      section:section,
      stSID:stSID,
      aadhaar:staadhaar
    };
    studentdb.put(elementum, function callback(err, result) {
      if (!err) {
        console.log('Successfully created a new student!');
      }
      else{console.log(err);}
    });
  }
  function teacherfunc(name,role,school,tSID,aadhaar) {
    var elementum = {
      _id: new Date().toISOString(),
      name: name,
      role:role,
      school:school,
      tSID:tSID,
      aadhaar:aadhaar
    };
    teacherdb.put(elementum, function callback(err, result) {
      if (!err) {
        console.log('Successfully created a new teacher!');
      }
      else{console.log(err);}
    });
  }
  function classfunc(name,subject1,subject2,subject3,subject4,subject5) {
    var elementum = {
      _id: new Date().toISOString(),
      name: name,
      subject1:subject1,
      subject2:subject2,
      subject3:subject3,
      subject4:subject4,
      subject5:subject5
    };
    classdb.put(elementum, function callback(err, result) {
      if (!err) {
        console.log('Successfully created a new class!');
      }
      else{console.log(err);}
    });
  }

  

  schoolbtn.addEventListener("click", function(){
    schoolfunc(sname.value,srole.value,sblock.value,sdistrict.value,sstate.value,sSID.value)
 });
 blockbtn.addEventListener("click", function(){
    blockfunc(bname.value,brole.value,bdistrict.value,bstate.value)
 });
 districtbtn.addEventListener("click", function(){
    districtfunc(dname.value,drole.value,dstate.value)
 });
 studentbtn.addEventListener("click", function(){
    studentfunc(stname.value,strole.value,stschool.value,stclass.value,stsection.value,stSID.value,staadhaar.value)
 });
 teacherbtn.addEventListener("click", function(){
    teacherfunc(tname.value,trole.value,tschool.value,tSID.value,taadhaar.value)
 });
 classbtn.addEventListener("click", function(){
    classfunc(cname.value,csubject1.value,csubject2.value,csubject3.value,csubject4.value,csubject5.value)
 });


//  blockdb.allDocs({include_docs: true, descending: true}).then( function( doc) {
//   console.log(doc.rows);
// }).catch(function(err)
// {
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


  


stubtn.addEventListener("click", function(){
    var queryString = "?" + session;
    window.location.href = "student.html" + queryString;
});

teabtn.addEventListener("click", function(){
  var queryString = "?" + session;
  window.location.href = "schoolsrc/home.html" + queryString;
});

shbtn.addEventListener("click", function(){
  var queryString = "?" + session;
  window.location.href = "schoolsrc/home.html" + queryString;
});

attendbtn.addEventListener("click", function(){
  var queryString = "?" + session;
  window.location.href = "attendanceN.html" + queryString;
});

fileS.addEventListener("click", function(){
  var queryString = "?" + session;
  window.location.href = "fileU.html" + queryString;
});

marksbtn.addEventListener("click", function(){
  var queryString = "?" + session;
  window.location.href = "marks.html" + queryString;
});

graphbtn.addEventListener("click", function(){
  var queryString = "?" + session;
  window.location.href = "graph.html" + queryString;
});

console.log(session)


  

var localADB = new PouchDB(session+'attenddb')
var localMDB = new PouchDB(session+'marksdb')

var remoteADB = new PouchDB('http://localhost:5984/'+session+'attenddb');
var remoteMDB = new PouchDB('http://localhost:5984/'+session+'marksdb');

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


localADB.allDocs({
  include_docs: true},
function (err,docs) {
  if(err){
    console.log(err)
  }
  else{
    console.log(docs.rows)
  }
})