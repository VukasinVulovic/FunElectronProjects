const { app, BrowserWindow, screen } = require('electron');

app.whenReady().then(main).catch(console.error);

function main() {
    const { width, height } = screen.getPrimaryDisplay().workAreaSize;

    const window = new BrowserWindow({
        center: true,
        width,
        height: 180,
        alwaysOnTop: true,
        frame: false,
        autoHideMenuBar: true,
        focusable: false,
        transparent: true,
        webPreferences: {
            nodeIntegration: true
        }
    });

    window.loadFile('./src/index.html');

    window.on('ready-to-show', () => {
        let prev_y = window.getPosition()[1];
        let i = 0;
        
        window.webContents.executeJavaScript('(new Audio(\'./sfx/mission_passed.mp3\')).play()', true)
        
        setTimeout(() => {
            const loop = setInterval(() => {
                for(let j = 0; j < 2; j++) {
                    if(i >= 200) {
                        clearInterval(loop);
                        return;
                    }
                    
                    window.setPosition(0, (prev_y - i));
                    i += 4;
                }
            }, 5);
        }, 800);
        
        setTimeout(() => window.close(), 4000);
    });
}