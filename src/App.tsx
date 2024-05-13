import React from 'react';
import './App.css';
import './index.css';
import logo from "./logo.png"

function App() {
  return (
    <div className="App">
      <header className='max-w-3xl m-auto ps-7'>
        <img src={logo} alt='logo' />
        <div>
          <select name="Mono" id="">
            <option value="">Sans Serif</option>
            <option value="">Serif</option>
            <option value="">Mono</option>
          </select>
        </div>
      </header>
    </div>
  );
}

export default App;
