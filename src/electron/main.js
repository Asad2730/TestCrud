const { app, BrowserWindow, ipcMain } = require('electron');
const { login,create } = require('./api_handling/handleApi')
const path = require('path')
const { spawn } = require('child_process')


const createWindow = () => {
    const win = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        nodeIntegration: true, 
        contextIsolation: false,
      },
    })
    

      const goServer = spawn('./src/go/employee.exe') 

      goServer.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
      });
    
      goServer.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
      });
    
      goServer.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
      });

    win.loadFile('./src/electron/pages/login.html')
    win.webContents.openDevTools()
    
  }




  app.whenReady().then(() => {
  
    createWindow();
  });


  // Listen for the 'login-api' event from the renderer process

  ipcMain.on('login-api', async (event, data) => {
    const { email, password } = data;  
    try {
      const {data} = await login(email, password);
     
      event.reply('login-success',data);
    } catch (error) {
      console.error('Error during login:', error.message);
       event.reply('login-error', error.message);
    }
  });


  ipcMain.on('create-api', async (event, data) => {
    const { email, password,type,name } = data;  
    try {
      await create(email,password,name,type);
    } catch (error) {
      console.error('Error during login:', error.message);
    }
  });


