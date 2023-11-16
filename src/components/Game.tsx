
import { useEffect, useState } from "react"
import Modal from "./Modal"


const Game = () => {
   // @ts-ignore
   const [sentence, setSentence] = useState([..."sentence goes here"])
   const [keyStrokes, setKeyStrokes] = useState<string[]>([])
   const [keysPressed, setKeysPressed] = useState(0)

   const handleKeyDown = (e: KeyboardEvent) => {
console.log(e.key)
      if (e.key === "Backspace") {



         setKeysPressed(prev => Math.abs(prev -=1) )
           // @ts-ignore
         setKeyStrokes(prev => prev.filter((p, i) => i !== prev.length - 1))


      } else if (e.key.length <= 1 && e.key.match(/[a-zA-Z0-9]/)) {
         setKeysPressed(prev => prev += 1)
         setKeyStrokes(prev => [...prev, e.key])

      } else if(e.key === " "){
         setKeysPressed(prev => prev += 1)
         setKeyStrokes(prev => [...prev, " "])
      }
   }



   useEffect(() => {
      window.addEventListener('keydown', (e) => handleKeyDown(e))
      return () => {
         window.removeEventListener('keydown', handleKeyDown)
      }
   }, [])

   useEffect(() => {
      console.log(keyStrokes)
   }, [keyStrokes])
   return (
      <div className="h-screen bg-gradient-to-tr from-emerald-950 to-cyan-900 flex flex-col items-center font-mono">
         <Modal text="description of rules" />
         <div className="">
            <h1 className="text-white text-3xl font-semibold py-12">Type Check</h1>
         </div>
         <div className="p-8 px-16 bg-stone-200">
            <h2>Type Check</h2>
            <div className="flex gap-4">
               <span> wordz per minutes : x</span>
               <span>sentences completed : x</span>
            </div>
            <div className="p-8 flex flex-col">
               <span className="even:bg-red-500">{sentence.map((w, i) => <span key={i} className={`${w === keyStrokes[i] && i <= keysPressed ? "bg-emerald-500" : "bg-red-500"}  whitespace-pre`}>{w}</span>)}

               </span>
               <span className="whitespace-pre">{keyStrokes.map((x, i)=><span className="whitespace-pre-wrap" key={i}>{x}</span>)}</span>
            </div>
         </div>
      </div>
   )
}

export default Game