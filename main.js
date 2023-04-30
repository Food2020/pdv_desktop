// main.js

// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain,Notification } = require("electron");
const path = require("path");

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile("index.html");

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
};

function loginWindow(){
  winlogin = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload:path.join(__dirname,"login.js")
    }
  })
  winlogin.loadFile("login.html");
}

app.whenReady().then(loginWindow)

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

ipcMain.handle("login",(event,obj)=>{
  validateLogin(obj)
})

function validateLogin(obj){
  const {email, password} = obj;

    if(email ==='test' && password === "123"){
      createWindow()
      window.show();
      winlogin().close()
    }
    else{
      new Notification({
        title:"login",
        body:"Erro!"
      }).show()
    }

}