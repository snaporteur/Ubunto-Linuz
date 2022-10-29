const { app } = require('electron');

app.whenReady().then(() => {
  require("./window/taskbar").window()
  require("./window/applist").init()

  app.on('activate', () => {
    
  }); 
});