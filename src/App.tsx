import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import './index.css';
import logo3 from "./logo3 .png"
// import arrowDown from "./arrow-down.svg"
import playAudio from "./playAudio.jpeg"
import moon2 from "./moon2.png"
import { Switch } from 'antd';
import search from "./search.svg"
import axios from "axios"
import spinner from "./spinner.svg"


function App() {
  interface Dictionary {
    meanings: {
      partOfSpeech: string[], // E.g., "noun", "verb"
      definitions: { definition: string}[],
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
  const [toggleOn, setToggleOn] = useState<boolean>(false)
  const [isloading, setIsLoading] = useState<boolean>(false)
  //const [wordData, setWordData] = useState<Dictionary | null>(null)


  const inputStyle = `py-5 px-6 ${toggleOn ? 'bg-[#1F1F1F] text-white' : 'bg-[#F5F5F5]'} rounded-2xl text-xl font-bold mt-[4.5rem] w-full font-${selectedFont}`;
  const onChange = (checked: boolean) => {

    // console.log(`switch to ${checked}`);
    setToggleOn(checked)
  };

  useEffect(() => {
    if (word.trim() !== "") {
      setIsLoading(true)

      axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
        .then(response => {
          console.log(response.data[0])
          setDictionaryValue(response.data)
          // setWordData(response.data[1])
        })
        .catch(error => {
          console.error("Fetching data failed:", error);
        })
        .finally(() => {
          setIsLoading(false)
        })
    } else {
      setDictionaryValue([])
    }
  }, [word])


  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setWord(e.target.value)
  }

  // max-w-3xl
  return (
    <div className={`App w-full py-4 px-[0.01rem] m-auto md:py-16 md:px-[24px] ${toggleOn ? 'bg-black' : 'bg-white'}`}>
      <header className='max-w-6xl m-auto mt-16 px-[24px]'>
        <div className='flex justify-between'>
          <div className='bg-black'>
            <img src={logo3} alt='logo' className='w-11 h-11 object-cover' />
          </div>
          <div className='flex'>
            <div >
              <select onChange={(e: any) => setSelectedFont(e.target.value)} id="" className={`${toggleOn ? 'bg-black text-white' : 'bg-white'} cursor-pointer border-y-0 border- border-r-2 p-2 pr-4 mr-4`}>
                <option className='cursor-pointer' value="sans-serif">Sans Serif</option>
                <option className='cursor-pointer' value="serif">Serif</option>
                <option className='cursor-pointer' value="mono">Mono</option>
              </select>
            </div>
            <div className="flex  ml-8  justify-between items-center gap-4">
              <Switch defaultChecked={toggleOn} onChange={onChange} />
              <span>
                <img className='w-8'  src={moon2} alt='moon-icon' />
              </span>
            </div>
          </div>
        </div>
        <div>
          <span className='flex justify-between relative'>
            <input onChange={handleInput}  className={inputStyle} style={{ fontFamily: selectedFont }} type="text" placeholder='Search for any word...' />
            <img onClick={() => handleInput} className='absolute top-24 cursor-pointer right-8 z-10 w-8' src={search} alt='search icon' />
          </span>
        </div>
      </header>

      {/* for displaying fetched objects */}
      {/* {
  wordData && <div>
    <p>{wordData.phonetic}</p>
    <p>{wordData.meanings[0].partOfSpeech}</p>
    <p>{wordData.meanings[0].definitions.map(a => a.definition)}</p>
  </div>
} */}

      <div   className={`font-${selectedFont} max-w-6xl m-auto mt-16 px-[24px] `}>
        {isloading ?
          <div>
            <img src={spinner} alt='spinner' />
          </div>
          : (
            <div>
              <div className='flex justify-between text-[#050505] items-center text-[4rem] font-bold py-6'>
                <h1 className={`${toggleOn ? 'text-white' : 'text-[#050505]'}`}>{word}</h1>

              </div>
              {dictionaryValue && dictionaryValue.map((item, index) => (
                <div key={index}>
                  <p className='text-[#a445ed] mb-4 flex text-2xl place-items-start'>{item.phonetic}</p>
                  <p className=''>{item.meanings && item.meanings.map((each, meaningIndex) => (
                    <div key={meaningIndex}>
                      <h2 className={`mb-6 flex font-bold justify-center ${toggleOn ? 'text-white' : 'text-[#050505]'} text-2xl italic my-10 items-center`}>{each.partOfSpeech} <span className='h-[0.05rem] bg-gray-400 w-full ml-4'></span></h2>
                      <h2 className='flex place-items-start text-2xl'>Meaning</h2>
                      {each.definitions.map((definition) => (
                        <div>
                          <li className={` ${toggleOn ? 'text-white' : 'text-black'} py-2  text-left marker:text-[#a445ed]`}> {definition.definition}</li>

                        </div>
                      ))}
                      {/* <audio onClick={handlePlay} ref={audioRef} src={item.phonetics.audio} controls /> */}
                    </div>
                  ))}</p>
                 <div className={`${toggleOn ? 'text-[#F5F5F5]' : 'text-[#050505]'} flex flex-col place-items-start`}>
                  <h4 className='my-4 '>Source</h4>
                  <p className=''>{item.sourceUrls && item.sourceUrls[0]}</p>
                 </div>
                </div>

              ))
              }
            </div>
          )
        }
      </div>
    </div >
  );
}

export default App;
