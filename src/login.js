var PouchDB = require('pouchdb')
PouchDB.plugin(require('pouchdb-authentication'));
PouchDB.plugin(require('pouchdb-find'));
//const ipcRenderer = require('electron').ipcRenderer; 


var userid = document.getElementById('uniqueID')
var userLevel=''
userLevel = userid.value;
if(userLevel.charAt(0)=='s')
{
    
}


var localDB = new PouchDB("_users");
var remoteDB = new PouchDB('http://localhost:5984/_users');
var sessionLDB = new PouchDB("session");
var sessionRDB = new PouchDB("'http://localhost:5984/session");
var cs=""
sessionLDB.createIndex({
  index: {
      fields: ['_id','value']
    }
}).then(function(index) {	
  sessionLDB.find({
      selector: {
          _id:"id"
        
        },
  }).then(function(result) {
      console.log(result.docs.map(function(doc) {  
        cs=doc.value;
        console.log(cs+"adafdaf")
        forAllTimeSync();
        }));	

          
  });	
});



var submitbtn = document.getElementById('submitbtn')
var gobackbtn = document.getElementById('gobackbtn')
var detailbtn = document.getElementById('detailbtn')
var uniqueID = document.getElementById('uniqueID');
var pass = document.getElementById('Password');

//=====================================local auth======================================

var authLocalDB = new PouchDB('authLocalDB')
var cmp=""
var cmp2=""
var uniqueID1=""
var level1=""

function addAuth(uniqueID,pass) {
  var elementum = {
    _id: new Date().toISOString(),
    uniqueID: uniqueID,
    pass:pass
  };

  authLocalDB.createIndex({
    index: {
        fields: ['uniqueID', 'pass']
           }
}).then(function(index) {	
    authLocalDB.find({
        selector: {
          uniqueID: uniqueID
          }
    }).then(function(result) {
        result.docs.map(function(doc){ console.log(cmp=doc.uniqueID)} )	
        if(uniqueID===cmp){
          console.log("exists")
          authLocalDB.allDocs({
            include_docs: true,
            attachments: true
          }).then(function (result) {
            console.log(result)
          }).catch(function (err) {
            console.log(err);
          });
        }
        else{

        console.log("nahi mila")
        authLocalDB.put(elementum, function callback(err, result) {
          if (!err) {
            console.log('Local Auth updated');
          }
        });
        }
    });	
});
setTimeout(function(){
  var queryString = "?" + uniqueID;
  userLevel = userid.value;
  if(userLevel.charAt(0)=='s')
  {
    window.location.href = "schoolsrc/home.html" + queryString;
  }
  if(userLevel.charAt(1)=='b')
  {
    window.location.href = "blocksrc/blockHome.html" + queryString;
  }
  if(userLevel.charAt(1)=='d')
  {
    window.location.href = "districtsrc/districtHome.html" + queryString;
  }
  if(userLevel.charAt(1)=='s')
  {
    window.location.href = "statesrc/stateHome.html" + queryString;
  }
  
}, 3000);

}

function checkAuth(uniqueID,pass) {
    
  authLocalDB.createIndex({
    index: {
        fields: ['uniqueID', 'pass']
      }
}).then(function(index) {	
    authLocalDB.find({
        selector: {
          uniqueID: uniqueID
          }
    }).then(function(result) {
      result.docs.map(function(doc){ console.log(cmp2=doc.pass) } )	
      if(pass===cmp2){
          console.log('Access Granted')

          var data ={
            _id:'id',
            value:uniqueID.value
        };

          sessionLDB.get('id').then(function(doc) {
            return sessionLDB.put(data);
          }).then(function () {
            return sessionLDB.get('id');
          }).then(function (data) {
            console.log(data);
          });
          
          
 
        var queryString = "?" + uniqueID;
        userLevel = userid.value;
  if(userLevel.charAt(0)=='s')
  {
    window.location.href = "schoolsrc/home.html" + queryString;
  }
  if(userLevel.charAt(1)=='b')
  {
    window.location.href = "blocksrc/blockhome.html" + queryString;
  }
        }
        else{
          console.log('password or username is wrong');
        }
    });	
});
}


submitbtn.addEventListener("click",function()
{

    remoteDB.logIn(uniqueID.value, pass.value, function (err, response) {
      if (err) 
      {  
        if (err.name === 'unauthorized' || err.name === 'forbidden') {
            console.log('name or password incorrect');
            alert('name or password incorrect');
        } 
        else {
            console.log(err);
            if(err.code==='ECONNREFUSED'){
              checkAuth(uniqueID.value,pass.value);
            }
            
        }
      }
      else{
        
        var data ={
          _id:'id',
          value:uniqueID.value
      };

        sessionLDB.get('id').then(function(doc) {
          doc.value = data.value;
          return sessionLDB.put(doc);
        }).then(function () {
          return sessionLDB.get('id');
        }).then(function (doc) {
          console.log(doc);
        });
        
              
        addAuth(uniqueID.value,pass.value);
        console.log('succesfull');

    }
    })

})

authLocalDB.allDocs({
  include_docs: true},
function (err,docs) {
  if(err){
    console.log(err)
         }
  else{
  console.log(docs.rows)
      }
})



sessionLDB.sync(sessionRDB, {
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

function forAllTimeSync(){
if(cs!=""){

  
var attendLDB = new PouchDB(cs+"attenddb");
var attendRDB = new PouchDB("'http://localhost:5984/"+cs+"attenddb");


  attendLDB.sync(attendRDB, {
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

  console.log("abcd"+cs)
  
}
}








// gobackbtn.addEventListener("click",function()
// {
//   window.location.replace("index.html");
// })