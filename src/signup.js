var PouchDB = require('pouchdb')
PouchDB.plugin(require('pouchdb-authentication'));

let win



var localDB = new PouchDB("_users")
var remoteDB = new PouchDB('http://localhost:5984/_users')

localDB.info().then(function (info) {
    console.log(info);
});
  
remoteDB.info().then(function (info) {
    console.log(info);
});

var submitbtn = document.getElementById('submitbtn')
var gobackbtn = document.getElementById('gobackbtn')
var user = document.getElementById('Username');
var pass = document.getElementById('Password');
var level = document.getElementById('level');
var uniqueID = document.getElementById('unique_id');

submitbtn.addEventListener("click",function()
{

    remoteDB.signUp(uniqueID.value, pass.value,{
      metadata : {
        user:user.value,
        level : level.value,
        }
      },function (err, response) {
        if (err) {
          if (err.name === 'conflict') {
            console.log('batman already exists, choose another username');
          } else if (err.name === 'forbidden') {
            console.log(' invalid username');
          } else {
            console.log(err);
          }
        }
        else{
            console.log('Badhai Ho');
            

            // var newUser = {
            //   '_id':'stu'+new Date().toISOString(),
            //   'name': user.value,
            //   'age': '20'
            // }
            // localDB.put(newUser, function callback(err, result) {
            //   if (!err) {
            //     console.log('Successfully posted a todo!');
            //   }
            // });
            //window.location.replace("home.html");
        }
    });
    
})
gobackbtn.addEventListener("click",function()
{

  window.location.replace("index.html");
    
})

localDB.allDocs({
  include_docs: true,
  attachments: true
}).then(function (result) {
  console.log(result)
}).catch(function (err) {
  console.log(err);
});

localDB.sync(remoteDB, {live: true, retry: true}).on('error', console.log.bind(console));

//batman brucewayne
