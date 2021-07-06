const {app, BrowserWindow, Tray, Menu} = require('electron')
const path = require('path')
var iconpath = path.join(__dirname, 'icon.jpg')
var AutoLaunch = require('auto-launch');

let ourapp = new AutoLaunch({
  name: 'ourapp',
  path: app.getPath('exe'),
});


let mainWindow

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true
    }
  })


  mainWindow.loadFile('src/index.html')

  mainWindow.webContents.openDevTools()

  // mainWindow.on('closed', function () {
  //   mainWindow = null
  // })
  //------------------------------------------------------auto-load-startup------------------------------

  ourapp.isEnabled()
  .then(function(isEnabled){
      if(isEnabled){
          return;
      }
      ourapp.enable();
  })
  .catch(function(err){
    
      alert(err)
  });

  //----------------------------------------------------------------------------------------------------
   var appIcon = new Tray(iconpath)
   
   var contextMenu = Menu.buildFromTemplate([
     { label: 'Show App', click:  function(){
         mainWindow.show();
     } },
     { label: 'Quit', click:  function(){
         app.isQuiting = true;
         app.quit();
     } }
   ]);
   
   appIcon.setContextMenu(contextMenu)
   
   mainWindow.on('close', function (event) {
     if(!app.isQuiting){
         event.preventDefault();
         mainWindow.hide();
     }
   
     return false;
   });
   
   // mainWindow.on('minimize', function (event) {
   //     event.preventDefault()
   //     mainWindow.hide()
   // })
   
   mainWindow.on('show', function () {
       appIcon.setHighlightMode('always')
   })


}


app.on('ready', createWindow)


app.on('activate', function () {
  if (mainWindow === null) createWindow()
})
