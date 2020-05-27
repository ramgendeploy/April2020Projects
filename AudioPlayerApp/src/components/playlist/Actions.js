import React, { useEffect, useState, useContext } from 'react'
import playerContext from '../../context/playerContext'

const { ipcRenderer } = window.require('electron')

// Hooks
const reqData = () => {
  ipcRenderer.send('asynchronous-message', 'Requesting the data')
}

// Component
function Actions() {
  const [url, ulrSet] = useState('')
  const { songsSet } = useContext(playerContext)
  useEffect(() => {
    ipcRenderer.on('asynchronous-reply', (event, arg) => {
      console.log(arg)
      if (!arg[0]) {
        ulrSet(arg[1][0])
        let prefix = arg[1] + '/'
        let newSongs = arg[2].map((s) => {
          return [s.name.split('.')[0], prefix + s.name]
        })
        // console.log('Hey!')
        console.log(newSongs)
        songsSet(newSongs)
      }
    })
  }, [])

  return (
    <div className="actions">
      <input className="path" onClick={() => reqData()} value={url} readOnly />
      <button onClick={() => reqData()}>
        <i className="far fa-folder-open"></i>
      </button>
    </div>
  )
}

export default Actions
