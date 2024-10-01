import logo from './logo.svg';
import './App.css';
import dummyData from './dummyData.js';
import { render } from '@testing-library/react';
import React, { useState } from 'react'


function App() {
  let [items, itemsFunc] = useState(dummyData);

  return (
    <div className='pokemon'>
      <img className='header' src="header.png" alt="pokemon logo"></img>
      <div className="grid-container">
        {items.map(function (item, i) {
          return (
            <div className="grid-item" key={i}>
              <h1>{item.title}</h1><br></br>
              <p><b>{item.content}</b></p><br></br>
              <h5>{item.type}</h5>
            </div>
          )
        })
        }
      </div>
    </div>
  )
}


export default App;
