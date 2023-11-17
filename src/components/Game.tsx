
import { useEffect, useState } from "react"
import Modal from "./Modal"
import Timer from "./Timer";
interface Quote {
   _id: string;
   content: string;
   author: string;
   tags: string[];
   authorSlug: string;
   length: number;
   dateAdded: string;
   dateModified: string;
}

const Game = () => {
   // @ts-ignore
   const [sentence, setSentence] = useState<Quote | null>()
   const [keyStrokes, setKeyStrokes] = useState<string[]>([])
   const [completed, setCompleted] = useState({ amount: 0, cumulativeWordsLength: 0 })
   const [gameStarted, setGameStarted] = useState(false)
   const [timer, setTimer] = useState({ stop: false, start: false })

   const fetchSentece = async () => {
      const resp = await fetch(`https://api.quotable.io/random`)
      const quote = await resp.json()
      return quote
   }

   const handleKeyDown = (e: KeyboardEvent) => {

      if (e.key === "Backspace") {

         // @ts-ignore
         setKeyStrokes(prev => prev.filter((p, i) => i !== prev.length - 1))

      } else if (e.key.length <= 1 && e.key.match(/[a-zA-Z0-9]/)) {
         if (!gameStarted) {
            setGameStarted(true)
            setTimer((prev) => ({ ...prev, start: true }))
         }
         setKeyStrokes(prev => [...prev, e.key])

      } else if (e.key === " ") {
         if (!gameStarted) {
            setGameStarted(true)
         }
         setKeyStrokes(prev => [...prev, " "])
      }
   }

   useEffect(() => {
      if (keyStrokes.toString() === sentence?.content) {
         console.log('its a match')
         let words = Array.from(sentence.content.split(" "))
         setCompleted(prev => ({ amount: prev.amount + 1, cumulativeWordsLength: prev.cumulativeWordsLength + words.length }))

      }
   }, [keyStrokes])
   useEffect(() => {
      if (gameStarted) {

      }
   }, [gameStarted])
   useEffect(() => {
      window.addEventListener('keydown', (e) => handleKeyDown(e))
      return () => {
         window.removeEventListener('keydown', handleKeyDown)
      }
   }, [])

   return (
      <div className="min-h-screen bg-gradient-to-tr from-emerald-950 to-cyan-900 flex flex-col items-center font-mono">
         <Modal text="description of rules" />
         <div className="">
            <h1 className="text-white text-3xl font-semibold py-12">Type Check</h1>
            <button onClick={async () => setSentence(await fetchSentece())} className="p-2 bg-stone-200 text-base font-bold">get sentence</button>
         </div>
         <Timer start={timer.start} stop={timer.stop} />
         <div className="p-8 px-16 bg-stone-300 mt-8 shadow-md shadow-black">
            <h2>Stats :</h2>
            <div className="flex flex-col gap-4">
               <span className="p-1">wordz per minute : {completed.cumulativeWordsLength / 60}</span>
               <span className="p-1">sentences completed : {completed.amount}</span>
            </div>
            <span className="font-bold text-xl p-2 text-white">{ }</span>
            <div className="p-8 flex flex-col justify-between gap-10">
               <span className="font-semibold p-2 min-h-[8rem] ring-2 ring-emerald-950">{sentence !== null && sentence !== undefined ? Array.from(sentence.content).map((w, i) => <span key={i} className={``}>{w}</span>) : <></>}

               </span>
               <span className="font-semibold p-4 whitespace-pre min-h-[8rem] ring-2 ring-emerald-950">{keyStrokes.map((k, i) => <span className={`whitespace-pre-wrap ${k === sentence?.content[i] ? "bg-emerald-600" : "bg-red-500"} `} key={i}>{k}</span>)}</span>
            </div>
         </div>
      </div>
   )
}

export default Game