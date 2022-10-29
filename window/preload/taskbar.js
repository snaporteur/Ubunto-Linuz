const { ipcRenderer, contextBridge } = require("electron")

contextBridge.exposeInMainWorld("app", {
    upwin: (win) => ipcRenderer.send("change-window-plan", win),
    clickAppList: () => ipcRenderer.send("click-applist")
});

window.addEventListener("DOMContentLoaded", () => {
    ipcRenderer.on("get-background-color", (event, color) => {
        document.querySelector("body").style = "background-color: " + color + ";";
    })
    ipcRenderer.on("get-changed-applist", (event, tableau) => {
        var code = "";
        for (let elem = 0; elem < tableau.length; elem++) {
            if(tableau[elem] != "Unlisted" && tableau[elem] != "Desktop" && tableau[elem] != "") {
                var name = "";
                if(tableau[elem].length > 20) {
                    name = tableau[elem].substring(0, 20) + "..."
                } else {
                    name = tableau[elem]
                }
                code += `<li><button class="button" onclick="window.app.upwin('${tableau[elem]}')">${name}</button></li>`;
            }
        }
        document.getElementById("apps").innerHTML = '<div id="apps" style="margin-left: 3px;margin-top: 0.2%;display: flex;">' + code + '</div>'
    });

});