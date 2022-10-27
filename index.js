const { app } = require('electron');

app.whenReady().then(() => {
  require("./window/background").window()
  require("./window/taskbar").window()

  app.on('activate', () => {
    
  }); 
});