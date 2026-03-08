import { app, BrowserWindow } from 'electron';
import started from 'electron-squirrel-startup';
import { setupWindow } from './windows';

if (started) {
  app.quit();
}

app.whenReady().then(() => {
  setupWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      setupWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
