import React, { useEffect } from 'react'

const { ipcRenderer } = window.require('electron')

// Hooks
const getData = () => {
  return undefined
}

const reqData = () => {
  ipcRenderer.send('asynchronous-message', 'Requesting the data')
}

// Component
function Actions() {
  useEffect(() => {
    ipcRenderer.on('asynchronous-reply', (event, arg) => {
      console.log(arg)
    })
  }, [])

  return (
    <div className="actions">
      <input className="path" />
      <button onClick={() => reqData()}>
        <i className="far fa-folder-open"></i>
      </button>
    </div>
  )
}

export default Actions
