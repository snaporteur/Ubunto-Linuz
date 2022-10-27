const {BrowserWindow, screen} = require("electron");
const path = require("path");
const config = JSON.parse(require("fs").readFileSync(path.join(__dirname, "../config.json"), "utf-8")).taskbar
module.exports = {
    window: function() {
        const window = new BrowserWindow({
            width: screen.getPrimaryDisplay().size.width,
            height: config.height,
            x: config.x,
            y: config.y,
            frame: false,
            movable: false,
            minimizable: false,
            maximizable: false,
            resizable: false,
            webPreferences: {
                preload: path.join(__dirname, "preload/taskbar.js")
            }
        });
        window.setBackgroundColor(config.color);
        window.loadFile(path.join(__dirname, "../browser/html/taskbar.html"));
    }
}