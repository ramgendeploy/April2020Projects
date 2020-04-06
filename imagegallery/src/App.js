import React, { Fragment } from 'react';
import './App.css';
import Gallery from './gallery/Gallery'
import Header from './Header'
import getData from './data'


function App() {
  let images = getData();
  return (
    <Fragment>
      <Header />
      <div className="gallery">
        <Gallery imgarr={images} />
      </div>
    </Fragment>
  );
}

export default App;
