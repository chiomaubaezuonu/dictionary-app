import React, { useState } from 'react';
import './App.css';
import './index.css';
import logo from "./logo.png"
// import arrowDown from "./arrow-down.svg"
import toggle from "./toggle.png"
import moon from "./moon.png"
import { Switch } from 'antd';

const onChange = (checked: boolean) => {
  
  console.log(`switch to ${checked}`);
};

function App() {
  // const [toggleDark, setToggleDark] = useState<boolean>(false)
 
  return (
    <div className="App">
      <header className='flex justify-between max-w-3xl m-auto mt-16 px-[24px]'>
        <img src={logo} alt='logo' className='w-11 h-11 object-cover' />
        <div className='flex'>
          <div>
            <select name="Mono" id="" className='border-y-0 border- border-r-2 p-2 mr-4'>
              <option value="">Sans Serif</option>
              <option value="">Serif</option>
              <option value="">Mono</option>
            </select>
            {/* <span>
            <img src={arrowDown} alt='down-arrow'/>
          </span> */}
          </div>
          <div className="flex bg-blue-200  ml-8 px-8 justify-between">
            {/* <img onClick={() => setToggleDark(!toggleDark)} className='w-11 h-11 object-cover' src={toggle} alt='toggle' /> */}
            <Switch defaultChecked onChange={onChange} />
            <span>
              <img src={moon} alt='moon-icon' />
            </span>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
