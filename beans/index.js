const { app, BrowserWindow, Menu } = require('electron');

app.whenReady().then(() => {
    const window = new BrowserWindow({
        width: 400,
        height: 600,
        icon: `${__dirname}/assets/icons/icon.png`,
        webPreferences: {
            nodeIntegration: true
        },
        transparent: true,
        fullscreenable: false,
        fullscreen: false,
        resizable: false
    });

    Menu.setApplicationMenu(Menu.buildFromTemplate([]));//empty stupid menu bar
    window.loadFile(`${__dirname}/index.html`);
});