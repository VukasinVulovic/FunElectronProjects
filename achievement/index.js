const { app, BrowserWindow, screen, globalShortcut  } = require('electron');

app.whenReady().then(function() {
    const app_window = new BrowserWindow({
        frame: false,
        width: 0,
        height: 80,
        x: screen.getPrimaryDisplay().bounds.width,
        y: 0,
        icon: './assets/icons/icon.png',
        webPreferences: {
            nodeIntegration: true,
            worldSafeExecuteJavaScript: true
        },
        fullscreen: false,
        fullscreenable: false,
        resizable: false,
        movable: false,
        alwaysOnTop: true,
        titleBarStyle: 'hiddenInset',
        show: false
    });

    app_window.hide();
    app_window.removeMenu();
    app_window.loadFile('index.html');

    let busy = false;

    console.log('Click "Alt + Ctrl + I".')
    globalShortcut.register('Alt+CommandOrControl+I', async() => {
        if(busy)
            return;

        busy = true;

        await openAchievement(
            app_window,
            'Very wholesome.', 
            './assets/images/shiba.png'
        );

        busy = false;
    });

});


async function openAchievement(window, text, icon) {
    return new Promise(resolve => {
        text = text.replace('\'', '&apos;').replace('"', '&quot;'); //replace ' and "
    
        let prev_x = window.getPosition()[0];
        let prev_h = window.getSize()[1];
        
        //set element values
        window.webContents.executeJavaScript(`
            new Audio('./assets/sfx/sound.mp3').play();
            document.querySelector('.title').innerHTML = "Achievement&nbsp;&nbsp;&nbsp;get!";
            document.querySelector('.text').innerHTML = "${text}";
            document.querySelector('.icon').src = "${icon}";
        `);
        
        //show window
        window.blur();
        window.showInactive(); //dont focus
    
        let w = 0; //width
        
        function close() {
            const loop = setInterval(() => { //close
                for(let i = 0; i < 3; i++) { 
                    window.setSize(w, prev_h);
                    window.setPosition(prev_x - w, 0);
                    w -= 3;
    
                    if(w <= 0) {
                        clearInterval(loop);
                        window.hide();
                        resolve();
                        return;
                    }
                }
            }, 4);
        }
    
        const loop = setInterval(() => { //open
            for(let i = 0; i < 3; i++) { 
                window.setSize(w, prev_h);
                window.setPosition(prev_x - w, 0);
                w += 3;
                
                if(w >= 300) {//if finised
                    clearInterval(loop);
                    setTimeout(close, 5000);
                    return;
                }
            }
        }, 3);
    });
}