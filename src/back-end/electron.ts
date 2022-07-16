import { app, BrowserWindow, session } from 'electron';

function setContentSecurityPolicy() {
    session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
        callback({
            responseHeaders: {
                ...details.responseHeaders,
                'Content-Security-Policy': ["default-src 'self'"],
            },
        });
    });
}

function createWindow() {
    const window = new BrowserWindow({
        width: 1280,
        height: 720,

        webPreferences: {
            sandbox: true,
        },
    });

    window.loadFile('index.html');
}

app.whenReady().then(() => {
    setContentSecurityPolicy();
    createWindow();

    app.on('activate', () => {
        if (process.platform === 'darwin' && BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
