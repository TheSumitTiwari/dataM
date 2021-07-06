var PouchDB = require('pouchdb');
PouchDB.plugin(require('pouchdb-find'));
const fs = require('fs');
var localFDB = new PouchDB('s16filedb')
var remoteFDB = new PouchDB('http://localhost:5984/'+'s16filedb');
const save = require('save-file');

var filebtn = document.getElementById('filebtn');
var input = document.querySelector('#file');
var showbtn = document.getElementById('showbtn');

var name = document.getElementById('name');
var file1
var content
var name
console.log('done')


function readUrl(input) {

  if (input.files && input.files[0]) {
    let reader = new FileReader();
    reader.onload = e => {
      let imgData = e.target.result;
      let imgName = input.files[0].name;
      input.setAttribute("data-title", imgName);
      console.log(e.target.result);
    };
    reader.readAsDataURL(input.files[0]);
  }

}


filebtn.addEventListener('click',function(){
      file1 =input.files[0].path; 
      console.log(input.files[0])
      name = input.files[0].name
      console.log(file1)
    fs.readFile(file1, function read(err, data) {
    if (err) {
        throw err;
    }
    content = data;   
    processFile();          
   });

   function processFile() {
    console.log(content);
 
    var doc = {
        "_id": 'mydoc'+new Date().toISOString(),
        "name": name,
        "_attachments": {
          name: {
            "content_type": "text/plain",
            "data": content
          }
        }
      };
      localFDB.put(doc).then(function (result) {
        console.log(result)
      }).catch(function (err) {
        console.log(err);
      });


   }

});

localFDB.sync(remoteFDB, {
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
  
  
  showbtn.addEventListener("click",function()
  {
      
      attable.innerHTML=""; 
      localFDB.createIndex({
          index: {
              fields: ['_id']
            }
      }).then(function(index) {	
          localFDB.find({
              selector: {
                  _id:{$gte:"0"}
                }
          }).then(function(result) {
              console.log(result.docs.map(function(doc) {
      
                  
                            
                $("#attable").append("<tr><th>"+doc.name+"</th><th><button id=\"btn"+doc._id+"\">Download</button><br></th></tr>")
               
                document.getElementById("btn"+doc._id).addEventListener("click",function()
                { 
                  localFDB.getAttachment(doc._id, 'name', function(err, blobOrBuffer) {
                    if (err) { return console.log(err); }
                    console.log(blobOrBuffer)
                     save(blobOrBuffer,'..\\'+doc.name)
                  });
                  
                  
              }); 
            
            }));	
  
          });	
      });
  })

