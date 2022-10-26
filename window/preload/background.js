const { ipcRenderer } = require("electron");

window.addEventListener("DOMContentLoaded", () => {
    ipcRenderer.on("set-background-src", (event, url) => {
        document.querySelector("img").src = url;
    });
});