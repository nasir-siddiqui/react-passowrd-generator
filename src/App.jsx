import { useState, useCallback, useEffect, useRef } from 'react'


function App() {

  const [length, setLength] = useState(8);
  const [numberAllowed, setnumberAlllowed] = useState(false);
  const [charAllowed, setcharAlllowed] = useState(false);
  const [password, setPassword] = useState('')

  const generatePassword = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    // ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz

    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()_+";
    for (let i = 1; i <= length; i++) {
      const char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass)
    // 0123456789
  },
    [length, numberAllowed, charAllowed]

  );


  const passwordRef = useRef(null);

  const copyPasswordtoClipboard = () => {

    window.navigator.clipboard.writeText(password)
    passwordRef.current?.select()
  }

  useEffect(() => {
    generatePassword();

  },
    [length, numberAllowed, charAllowed]
  )


  return (
    <>
      <div className="bg-neutral-900 flex flex-col justify-center items-center w-full h-screen text-white">
        <h1 className="text-violet-600 text-5xl text-center mb-3" >Password Generator</h1>
        <div className=" bg-neutral-800 p-4 rounded-lg">
          <div className=" flex justify-center items-center mb-5">
            <input type="text" placeholder='Password'
              value={password} ref={passwordRef}
              className='outline-none w-full h-[40px] text-violet-600 px-2' readOnly
            />
            <button onClick={copyPasswordtoClipboard} className='px-2 h-[40px] w-[80px]  bg-blue-600 hover:bg-violet-700 '>Copy</button>
          </div>


          <div className="flex justify-between items-center">
            <div className="mr-4">
              <input type="range" min={4} max={25} value={length} onChange={(e) => setLength(e.target.value)} id="" />
              <label className=' ml-1' htmlFor="length">Length: {length}</label>
            </div>
            <div className="mr-2">
              <input className='mx-1' type="checkbox" name="number" id="number"
                defaultChecked={numberAllowed}
                onChange={() => {
                  setnumberAlllowed((prev) => !prev)
                }}
              />
              <label htmlFor="number">Number</label>
            </div>
            <div className="mr-2">
              <input className='mx-1' type="checkbox" name="character" id="character"
                defaultChecked={charAllowed}
                onChange={() => {
                  setcharAlllowed((prev) => !prev)
                }}
              />
              <label htmlFor="character">Character</label>
            </div>

          </div>
        </div>

      </div>
    </>
  )
}

export default App
