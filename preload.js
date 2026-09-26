const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('lectureMindDesktop', {
  isElectron: true,
  platform: process.platform,
  appVersion: process.versions.electron
});
