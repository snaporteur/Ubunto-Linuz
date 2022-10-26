const {BrowserWindow, screen} = require("electron");
const path = require("path");
module.exports = {
    window: function() {
        const window = new BrowserWindow({
            width: screen.getPrimaryDisplay().size.width,
            height: screen.getPrimaryDisplay().size.height,
            x: 0,
            y: 0,
            frame: false,
            movable: false,
            minimizable: false,
            maximizable: false,
            resizable: false,
            webPreferences: {
                devTools: false,
                preload: path.join(__dirname, "preload/background.js")
            }
        })
        window.removeMenu();
        window.setSkipTaskbar(true);
        window.loadFile("html/background.html");
    }
};