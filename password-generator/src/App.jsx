import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

function App() {

  //  length, character, number, password

  const [password, setPassword] = useState("");
  const [charAllowed, setCharAllowed] = useState(false);
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);

  const passwordRef = useRef(null);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if(charAllowed) str += "!@#$%^&*-+=";
    if(numberAllowed) str += "1234567890";
    
    for(let i=1; i<=length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, charAllowed, numberAllowed, setPassword]); 

  useEffect(() => {
    passwordGenerator();
  }, [length, charAllowed, numberAllowed, passwordGenerator]);

  return (
    <>
      <div 
        className='w-full max-w-md mx-auto shadow-md rounded-lg px-5 py-10 my-8 bg-cyan-900 text-white'>

        <h1 className='text-xl font-bold my-3'>Password Generator</h1>

        <div className='flex shadow rounded-xl overflow-hidden mb-5 justify-center'>
          <input 
            type="text" 
            readOnly 
            value={password} 
            className="outline-none py-1 w-full px-3"
            ref={passwordRef}
          />
          <button 
            className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0' 
            onClick={copyPasswordToClipboard}>
              Copy
          </button>
        </div>

        <div className='flex items-center justify-center gap-2'>
          <div className='flex items-center gap-1'>
            <label htmlFor="length">Length: {length}</label>
            <input type="range" min="8" max="100" value={length} onChange={(e) => setLength(e.target.value)}/>
          </div>
          <div className='flex items-center gap-1'>
            <label htmlFor="number">Numbers</label>
            <input 
              type="checkbox" 
              name="numbers" 
              id="numbers" 
              onChange={() => setNumberAllowed(prev => !prev)} 
              />
          </div>
          <div className='flex items-center gap-1'>
            <label htmlFor="characters">Characters</label>
            <input 
              type="checkbox" 
              name="characters" 
              id="characters" 
              onChange={() => setCharAllowed(prev => !prev)} 
            />
          </div>
        </div>

      </div>
    </>
  )
}

export default App
