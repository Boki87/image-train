// Native
import { join } from 'path';
import fs from 'fs';
import { doActions } from './imageUtils.js'
import os from 'os'

// Packages
import { BrowserWindow, app, ipcMain, IpcMainEvent, session } from 'electron';
import isDev from 'electron-is-dev';

const height = 600;
const width = 800;

function createWindow() {
  // Create the browser window.
  const window = new BrowserWindow({
    width,
    height,
    frame: true,
    show: true,
    resizable: true,
    fullscreenable: true,
    webPreferences: {
      preload: join(__dirname, 'preload.js')
    }
  });

  const port = process.env.PORT || 3000;
  const url = isDev ? `http://localhost:${port}` : join(__dirname, '../src/out/index.html');

  // and load the index.html of the app.
  if (isDev) {
    window?.loadURL(url);
  } else {
    window?.loadFile(url);
  }
  // Open the DevTools.
  // window.webContents.openDevTools();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
const reactDevToolsPath = join(os.homedir(), '/Library/Application Support/Google/Chrome/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/4.20.1_0')
app.whenReady().then( async () => {
  createWindow();

  await session.defaultSession.loadExtension(reactDevToolsPath)

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

// listen the channel `message` and resend the received message to the renderer process
// ipcMain.on('message', (event: IpcMainEvent, message: any) => {
//   // console.log(111, message, event);
//   // setTimeout(() => event.sender.send('message', 'hi from electron'), 500);
// });

ipcMain.on('GET_PRESETS', (event: IpcMainEvent) => {
  
  let presets = JSON.parse(fs.readFileSync(join(__dirname, 'data', 'presets.json'), { encoding: 'utf-8' }))
    event.sender.send('GET_PRESETS_REPLY', presets) 
});

ipcMain.on('RUN_ACTIONS', async (event: IpcMainEvent, message: any) => {
  await doActions(message.actions, message.images)
  event.sender.send('RUN_ACTIONS_REPLY', 1)
})

ipcMain.on('SAVE_PRESETS', async (event: IpcMainEvent, message: any) => {
  await fs.writeFileSync(join(__dirname, 'data', 'presets.json'), JSON.stringify(message))
  event.sender.send('SAVE_PRESETS_REPLY', 1)
})