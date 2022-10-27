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
                preload: path.join(__dirname, "preload/background.js")
            }
        })
        window.removeMenu();
        window.loadFile("browser/html/background.html");
        
        if(JSON.parse(require("fs").readFileSync(path.join(__dirname, "../config.json"), "utf-8")).background.image == "default") {
            window.webContents.send("set-background-src", "../../data/background/default.jpg")
        } else {
            window.webContents.send("set-background-src", JSON.parse(require("fs").readFileSync(path.join(__dirname, "../config.json"), "utf-8")).background.image)
        }
    }
};