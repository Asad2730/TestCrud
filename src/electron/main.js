const { app, BrowserWindow,ipcMain } = require('electron')
const { login,create } = require('./api_handling/handleApi')


const createWindow = () => {
    const win = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        nodeIntegration: true, 
        contextIsolation: false,
      },
    })
  
    win.loadFile('./src/electron/pages/login.html')
    win.webContents.openDevTools()

  }


  app.whenReady().then(() => {
    createWindow()
  })


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