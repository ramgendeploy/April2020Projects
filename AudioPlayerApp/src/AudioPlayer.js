import React from 'react'
import Header from './components/graphics/Header'
import Graphics from './components/graphics/Graphics'
import Playlist from './components/playlist/Playlist'
import Actions from './components/playlist/Actions'
import Controls from './components/Controls'

import PlayerState from './context/PlayerState'

import './main.css'
import './input.css'

const close = () => {
  console.log('Closing the app')
}

function AudioPlayer() {
  return (
    <PlayerState>
      <div className="main">
        <div className="windowCtr">
          <span className="appName draggable">ReactWave</span>
          <span className="minW no_drag" onClick={close}>
            _
          </span>
          <span className="closeW no_drag" onClick={close}>
            X
          </span>
        </div>
        <div className="top">
          <div className="left">
            <Header />
            <Graphics />
          </div>
          <div className="right">
            <Actions />
            <Playlist />
          </div>
        </div>
        <Controls />
      </div>
    </PlayerState>
  )
}

export default AudioPlayer
