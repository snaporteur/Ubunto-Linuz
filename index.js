const { app } = require('electron');

app.whenReady().then(() => {
  require("./window/background").window()
  
  app.on('activate', () => {
    
  }); 
});