import React, { useState } from 'react';
import './App.css';
import './index.css';
import logo from "./logo.png"
// import arrowDown from "./arrow-down.svg"
import playAudio from "./playAudio.jpeg"
import moon from "./moon.png"
import { Switch } from 'antd';
import search from "./search.png"

const onChange = (checked: boolean) => {

  console.log(`switch to ${checked}`);
};

function App() {
  // const [toggleDark, setToggleDark] = useState<boolean>(false)
  const [word, setWord] = useState<string>("")

  return (
    <div className="App max-w-3xl m-auto mt-16 px-[24px]">
      <header className=' max-w-3xl m-auto mt-16 px-[24px]'>
        <div className='flex justify-between'>
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
            <div className="flex  ml-8 px-8 justify-between">
              <Switch defaultChecked={false} onChange={onChange} />
              <span>
                <img src={moon} alt='moon-icon' />
              </span>
            </div>
          </div>
        </div>
        <div>
          <input onChange={(e) => setWord(e.target.value)} className='py-5 px-6 bg-[#F5F5F5] rounded-2xl text-xl font-bold mt-[4.5rem] w-full' type="text" placeholder='Search for any word...' />
          <img src={search} alt='search icon' />
        </div>
      </header>
      <div className='flex justify-between text-[#050505] items-center text-[4rem] font-bold py-6 px-6'>
        <h1>{word}</h1>
        <img className='w-12 cursor-pointer hover:bg-red-700 ' src={playAudio} alt="play audio icon" />
      </div>
    </div>
  );
}

export default App;
