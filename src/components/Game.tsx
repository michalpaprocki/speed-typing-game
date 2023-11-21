
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

   const [sentence, setSentence] = useState<Quote | null>()
   const [keyStrokes, setKeyStrokes] = useState<string[]>([])
   const [completed, setCompleted] = useState({ amount: 0, cumulativeWordsLength: 0 })
   const [game, setGame] = useState({ started: false, over: false })
   const [minutes, setMinutes] = useState("1")
   const [showInfo, setShowInfo] = useState(false)

   const fetchSentece = async () => {
      const resp = await fetch(`https://api.quotable.io/random`)
      const quote = await resp.json()
      return quote
   }
   const nextSentence = async () => {
      if (sentence) {
         let words = Array.from(sentence.content.split(" "))
         setCompleted(prev => ({ amount: prev.amount + 1, cumulativeWordsLength: prev.cumulativeWordsLength + words.length }));
         setKeyStrokes([]);
         setSentence(await fetchSentece())
      }
   }
   const handleKeyDown = (e: KeyboardEvent) => {

      if (e.key === "Backspace") {
         // @ts-ignore
         setKeyStrokes(prev => prev.filter((p, i) => i !== prev.length - 1))

      } else if (e.key.length <= 1 && e.key.match(/[a-zA-Z0-9''"!?;: ,.-]/) && !game.over) {
         e.preventDefault()
         if (!game.started) {
            setGame(prev => { return { ...prev, started: true } })

         }
         setKeyStrokes(prev => [...prev, e.key])

      } else if (e.key === " " || e.code === "space" && !game.over) {
         e.preventDefault()
         if (!game.started) {
            setGame(prev => { return { ...prev, started: true } })
         }
         setKeyStrokes(prev => [...prev, " "])
      }
   }

   useEffect(() => {
      if (sentence?.content) {
         let areEqual = Array.from(sentence?.content).map((k, i) => { if (k !== keyStrokes[i]) { return false } else { return true } })

         areEqual.includes(false) ? null : nextSentence()


      }

   }, [keyStrokes])

   useEffect(() => {
      if (game.over && sentence) {
         let amountCompleted = keyStrokes.length
         let words = sentence?.content.slice(0, amountCompleted).split(" ")
         setCompleted(prev => ({ ...prev, cumulativeWordsLength: prev.cumulativeWordsLength + words?.length }))
         setShowInfo(true)
      }
   }, [game.over])
   useEffect(() => {
      (async () => {
         setSentence(await fetchSentece())
      })()
      window.addEventListener('keydown', (e) => handleKeyDown(e))
      return () => {
         window.removeEventListener('keydown', (e) => handleKeyDown(e))
      }
   }, [])
   return (
      <div className="min-h-screen bg-gradient-to-tr from-emerald-950 to-cyan-900 flex flex-col items-center font-mono">
         <Modal text="description of rules" />
         {showInfo === true ? <div className="p-4 bg-stone-300 shadow-md shadow-black flex flex-col absolute top-[50%]">
            <span className="p-4 px-8">You managed to:</span>
            <span>-  reach <b>{completed.cumulativeWordsLength / parseInt(minutes)}</b> words per minute.</span>
            <span>- complete <b>{completed.amount}</b> quotes.</span>
            <button className="p-4 mt-12 px-8 hover:text-white hover:bg-black" onClick={() => {
               setShowInfo(false); nextSentence(); setCompleted({ amount: 0, cumulativeWordsLength: 0 })
               setGame({ over: false, started: false })
            }}>OK</button>
         </div> : <></>}
         <div className="">
            <h1 className="text-white text-3xl font-semibold py-12">Speed Typing</h1>
         </div>
         <Timer start={game.started} callback={() => { setGame({ over: true, started: false }) }} limit={minutes} />
         <div className="p-8 px-16 bg-stone-300 mt-8 shadow-md shadow-black min-w-[90%]  md:min-w-[60%]">
            {keyStrokes.length === 0 && !game.started ? <h2>Countdown starts whe a key is pressed.</h2> : <></>}
            <div className="p-2 flex flex-col gap-2">
               <span>Minutes : {minutes}</span>
               <input disabled={game.started ? true : false} type="range" min={1} max={10} value={minutes} onChange={(e) => {
                  game.started ? null :
                     setMinutes(e.currentTarget.value)

               }} /></div>
            <span className="font-bold text-xl p-2 text-white">{ }</span>
            <div className="p-4 flex flex-col justify-between gap-10">
               {sentence?.author}
               <span className="font-semibold p-2 min-h-[8rem] ring-2 ring-emerald-950">{sentence !== null && sentence !== undefined ? Array.from(sentence.content).map((w, i) => <span key={i} className={`bg-blue-400`}>{w}</span>) : <></>}
               </span>
               <span className="font-semibold p-2 whitespace-pre min-h-[8rem] ring-2 ring-emerald-950">{game.over=== false&&keyStrokes.map((k, i) => <span className={`whitespace-pre-wrap ${k === sentence?.content[i] ? "bg-emerald-600" : "bg-red-500 text-whitess"} `} key={i}>{k}</span>)}</span>
            </div>
         </div>
      </div>
   )
}

export default Game