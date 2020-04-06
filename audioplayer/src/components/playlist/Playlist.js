import React, { useContext } from 'react'
import playerContext from '../../context/playerContext'


function Playlist() {
  const { SetCurrent, currentSong, songs } = useContext(playerContext)

  return (
    <div className="playlist">
      <div className="header">
        <i className="fas fa-list-ul"></i>
        <span className="pltext">Play List</span>
      </div>
      <div className="songlist">
        <ul className="loi">
          {
            songs.map((song, i) =>
              <li className={'songContainer ' + (currentSong === i ? 'selected' : '')} key={i} onClick={() => { SetCurrent(i); }}>
                <i className="fas fa-music"></i>
                <span className="song">{song[0]}</span>
              </li>
            )
          }
        </ul>
      </div>
    </div>
  )
}

export default Playlist
