const { parentPort } = require("worker_threads");
const { exec } = require("child_process");
var lastprocess = [];
var process = [];
setInterval(() => {
    exec("wmctrl -l", (error, stdout) => {
        if(error == null) {
            process = stdout.split("\n");
            for (let proc = 0; proc < process.length - 1; proc++) {
                process[proc] = process[proc].substring(15 + require("os").hostname().length);
            };
            if(process !== lastprocess) {
                parentPort.postMessage(process);
                lastprocess = process;
            }
        } else {
            parentPort.postMessage(error)
        }
    });
}, 500);