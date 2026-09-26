const { app, BrowserWindow, session, shell } = require('electron');
const path = require('path');

const APP_FILE = path.join(__dirname, 'LectureMind_AI_app.html');

function createWindow() {
  const win = new BrowserWindow({
    width: 1440,
    height: 920,
    minWidth: 1000,
    minHeight: 700,
    show: false,
    backgroundColor: '#f5f7fb',
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false,
      webSecurity: true,
      allowRunningInsecureContent: false
    }
  });

  win.once('ready-to-show', () => win.show());

  // Keep external websites out of the application window.
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (/^https?:\/\//i.test(url)) shell.openExternal(url);
    return { action: 'deny' };
  });

  win.webContents.on('will-navigate', (event, url) => {
    if (!url.startsWith('file://')) {
      event.preventDefault();
      if (/^https?:\/\//i.test(url)) shell.openExternal(url);
    }
  });

  win.loadFile(APP_FILE);
}

app.whenReady().then(() => {
  const permissions = new Set([
    'media',
    'camera',
    'microphone',
    'notifications'
  ]);

  session.defaultSession.setPermissionRequestHandler((webContents, permission, callback) => {
    callback(permissions.has(permission));
  });

  session.defaultSession.setPermissionCheckHandler((webContents, permission) => {
    return permissions.has(permission);
  });

  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
