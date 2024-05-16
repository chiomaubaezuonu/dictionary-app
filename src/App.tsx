import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import './index.css';
import logo from "./logo.png"
// import arrowDown from "./arrow-down.svg"
import playAudio from "./playAudio.jpeg"
import moon from "./moon.png"
import { Switch } from 'antd';
import search from "./search.svg"
import axios from "axios"

const onChange = (checked: boolean) => {

  console.log(`switch to ${checked}`);
};

function App() {
  // interface Dictionary {
  //   meanings: {
  //     partOfSpeech: string[],  // E.g., "noun", "verb"
  //     definitions: string[],
  //     synonyms?: string[],   // Optional (not always present in response)
  //     antonyms?: string[]   // Optional
  //   },
  //   phonetic: string,

  // }

  interface Dictionary {
    meanings: {
      partOfSpeech: string[], // E.g., "noun", "verb"
      definitions: { definition: string }[],
      synonyms?: string[],  // Optional (not always present in response)
      antonyms?: string[]  // Optional
    }[],
    phonetic: string,
    phonetics: {
      audio: string
    }

    sourceUrls?: string[]
  }

  const [word, setWord] = useState<string>("")
  const [dictionaryValue, setDictionaryValue] = useState<Dictionary[]>([])
  const [selectedFont, setSelectedFont] = useState<string>("sans-serif")
  const [audioData, setAudioData] = useState<string | null>(null);
  //const [wordData, setWordData] = useState<Dictionary | null>(null)


  const audioRef = useRef<HTMLAudioElement | null>(null);
  useEffect(() => {
    axios.get('https://api.dictionaryapi.dev/api/v2/entries/en/cat')
      .then(response => {
        console.log(response.data[0])
        setDictionaryValue(response.data)
        // setWordData(response.data[1])
      })
  }, [])

  // const handlePlay = () => {
  //   alert("clicked")
  //   if (audioRef.current) {
  //     audioRef.current.play();
  //   }
  // };

  const handleInput = (e: any) => {
    e.preventDefault();
    setWord(e.target.value)
  }
  let switchFont = (e: any) => {
    let font = e.target;
    e.style.font = font
  }

  return (
    <div className="App max-w-3xl m-auto mt-16 px-[24px]">
      <header className=' max-w-3xl m-auto mt-16 px-[24px]'>
        <div className='flex justify-between'>
          <img src={logo} alt='logo' className='w-11 h-11 object-cover' />
          <div className='flex'>
            <div >
              <select onChange={(e: any) => setSelectedFont(e.target.value)} id="" className='cursor-pointer border-y-0 border- border-r-2 p-2 pr-4 mr-4'>
                <option value="sans-serif">Sans Serif</option>
                <option value="serif">Serif</option>
                <option value="mono">Mono</option>
              </select>
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
          <span className='flex justify-between relative'>
            <input onChange={handleInput} className='py-5 px-6 bg-[#F5F5F5] rounded-2xl text-xl font-bold mt-[4.5rem] w-full' type="text" placeholder='Search for any word...' />
            <img className='absolute top-24 cursor-pointer right-8 z-10 w-8' src={search} alt='search icon' />
          </span>
        </div>
      </header>
      <div className='flex justify-between text-[#050505] items-center text-[4rem] font-bold py-6 px-6'>
        <h1>{word}</h1>
        {/* <img onClick={handlePlay} className='w-12 cursor-pointer' src={playAudio} alt="play audio icon" /> */}

      </div>
      <div>

        {/* for displaying fetched objects */}
        {/* {
  wordData && <div>
    <p>{wordData.phonetic}</p>
    <p>{wordData.meanings[0].partOfSpeech}</p>
    <p>{wordData.meanings[0].definitions.map(a => a.definition)}</p>
  </div>
} */}



        {dictionaryValue && dictionaryValue.map((item, index) => (
          <div key={index} className={`font-${selectedFont}`}>
            <p className='text-[#a445ed] mb-4 flex text-2xl place-items-start'>{item.phonetic}</p>
            <p className=''>{item.meanings && item.meanings.map((each, meaningIndex) => (
              <div key={meaningIndex}>
                <h2 className='mb-6 flex font-bold justify-center text-[#050505] text-2xl italic my-10 items-center'>{each.partOfSpeech} <span className='h-[0.1rem] bg-gray-200 w-full ml-4'></span></h2>
                <h2 className='flex place-items-start text-2xl'>Meaning</h2>
                {each.definitions.map((definition) => (
                  <li className='text-left marker:text-[#a445ed]'> {definition.definition}</li>
                ))}
                {/* <audio onClick={handlePlay} ref={audioRef} src={item.phonetics.audio} controls /> */}
              </div>
            ))}</p>

          </div>
        ))}
      </div>
    </div >
  );
}

export default App;
