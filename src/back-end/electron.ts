import { app, BrowserWindow } from 'electron';

function createWindow() {
    const window = new BrowserWindow({
        width: 1280,
        height: 720,
    });

    window.loadFile('index.html');
}

app.whenReady().then(() => {
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
