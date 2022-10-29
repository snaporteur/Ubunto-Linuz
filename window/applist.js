const { BrowserWindow, screen } = require("electron");
const path = require("path")
const config = JSON.parse(require("fs").readFileSync(path.join(__dirname, "../config.json"), "utf-8"))
var window;
module.exports = {
    init: function() {
        window = new BrowserWindow({
            width: screen.getPrimaryDisplay().size.width,
            height: screen.getPrimaryDisplay().size.height - 178,
            x: 0,
            y: config.taskbar.height + 30,
            frame: false,
            transparent: true,
            title: "Unlisted"
        })
        window.loadFile(path.join(__dirname, "../browser/html/applist.html"))
        window.hide()
    },
    show: function() {
        window.show()
    },
    hide: function() {
        window.hide()
    }
}