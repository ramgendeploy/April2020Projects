const electron = require('electron')

const app = electron.app
const dialog = electron.dialog

const BrowserWindow = electron.BrowserWindow

const url = require('url')
const isDev = require('electron-is-dev')

const path = require('path')
const fs = require('fs')

let mainWindow

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 650,
    minHeight: 650,
    minWidth: 850,
    maxWidth: 1200,
    maxHeight: 800,
    titleBarStyle: 'customButtonsOnHover',
    frame: false,
    // resizable: false,
    webPreferences: {
      nodeIntegration: true,
    },
  })

  mainWindow.removeMenu()

  mainWindow.loadURL(`file://${path.join(__dirname, '/build/index.html')}`)
  mainWindow.webContents.openDevTools()
  mainWindow.on('closed', () => (mainWindow = null))
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

// Interface
const { ipcMain } = require('electron')
ipcMain.on('asynchronous-message', (event, arg) => {
  dialog
    .showOpenDialog(mainWindow, {
      filters: [{ name: 'Audio', extensions: ['mp3', 'ogg', 'wav'] }],
      title: 'Select a directory',
      buttonLabel: 'Select directory',
      properties: ['openFile', 'openDirectory'],
    })
    .then((result) => {
      if (!result.canceled) {
        fs.readdir(
          result.filePaths[0],
          { withFileTypes: true },
          (err, files) => {
            if (err) {
              event.reply('asynchronous-reply', [
                result.canceled,
                result.filePaths,
              ])
            }
            event.reply('asynchronous-reply', [false, result.filePaths, files])
          },
        )
      } else {
        event.reply('asynchronous-reply', [result.canceled, result.filePaths])
      }
    })
    .catch((err) => {
      console.log(err)
    })
})
