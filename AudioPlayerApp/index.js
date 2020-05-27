const electron = require('electron')

const app = electron.app
const dialog = electron.dialog

const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')
const isDev = require('electron-is-dev')

let mainWindow

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 500,
    minHeight: 500,
    minWidth: 400,
    // resizable: false,
    webPreferences: {
      nodeIntegration: true,
    },
  })
  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`,
  )

  // mainWindow.removeMenu()
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
  console.log(arg) // prints "ping"
  event.reply('asynchronous-reply', 'Electron response')

  dialog
    .showOpenDialog(mainWindow, {
      properties: ['openFile', 'openDirectory'],
    })
    .then((result) => {
      event.reply('asynchronous-reply', [result.canceled, result.filePaths])
    })
    .catch((err) => {
      console.log(err)
    })
})
