
import { useEffect } from "react"
import Modal from "./Modal"


const Game = () => {

let words= "sentence goes here"
let arr = [...words]

   useEffect(()=>{
      window.addEventListener('keydown', (e)=>{console.log(e)})
   })


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
            <div className="p-8">
               <span className="even:bg-red-500">{arr.map((w,i)=> i %2 ? w.toUpperCase(): w)}

               </span>
            </div>
         </div>
      </div>
   )
}

export default Game