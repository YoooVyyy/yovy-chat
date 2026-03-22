import { setupWindow } from './windows';
import logManager from './service/log';
import { app, BrowserWindow } from 'electron';
import started from 'electron-squirrel-startup';

if (started) {
  app.quit();
}

process.on('uncaughtException', (error) => {
  logManager.error('Uncaught Exception:', error)
})

process.on('unhandledRejection', (reason, promise) => {
  logManager.error('Unhandled Rejection:', reason, promise)
})

// fulfilled when Electron is initialized
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
