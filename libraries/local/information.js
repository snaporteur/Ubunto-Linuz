const { BrowserWindow } = require("electron");
const path = require("path");module.exports = {
    about: function(name, p) {
        const window = new BrowserWindow({
            width: 200,
            height: 100,
            title: name,
        });
        window.setMenuBarVisibility(false);
        window.loadURL(`../../browser/html/information.html?type=about&title=${name}&p=${p}`)
    }
}