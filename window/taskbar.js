const {BrowserWindow, screen, ipcMain} = require("electron");
const { Worker } = require("worker_threads");
const { exec } = require("child_process");
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
            alwaysOnTop: true,
            title: "Unlisted",
            webPreferences: {
                devTools: true,
                nodeIntegration: false,
                contextIsolation: true,
                preload: path.join(__dirname, "preload/taskbar.js")
            }
        });
        window.loadFile(path.join(__dirname, "../browser/html/taskbar.html"));
        window.webContents.send("get-background-color", config.color);

        ipcMain.on("change-window-plan", (event, win) => {
            exec(`wmctrl -a ${win}`);
        });

        ipcMain.on("click-applist", (event) => {
            require("../window/applist").show()
        });

        new Promise((resolve, reject) => {const worker = new Worker(path.join(__dirname, "../thread/winmapper.js"))
            worker.on('online', () => { console.log('Winmappig started') })
            worker.on('message', tableau => {
              window.webContents.send("get-changed-applist", tableau);
            })
            worker.on('error', reject)
            worker.on('exit', code => {
                if (code !== 0) {
                    reject(`Winmapping stopped with exit code ${code}`)
                }
            })
        })
    }
}