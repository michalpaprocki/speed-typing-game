import { useState, useEffect } from 'react'
interface Props {
    text: string;
}

const Modal = ({ text }: Props) => {
    const [show, setShow] = useState(false)
    const rulesRead = () => {
        localStorage.setItem("rules", "read")
    }

    useEffect(() => {
        let rules = localStorage.getItem('rules')
        if (rules !== null) {
            setShow(false)
        } else { setShow(true) }
    }, [])
    if (show) {
        return (
            <div className="p-8 py-4 absolute top-[30%] flex flex-col bg-stone-300 items-center shadow-lg shadow-black rounded-sm">
                <span className="first-letter:capitalize p-8 py-4 pb-8 font-semibold">{text}</span>
                <button className="p-4 w-[13ch] px-2 font-semibold hover:bg-black hover:text-white rounded-sm" onClick={() => { setShow(false); rulesRead() }}>OK</button>
            </div>
        )
    }
    return (
        <div onClick={()=>setShow(true)} className='absolute p-1 bg-stone-300 top-0 right-0 m-2 uppercase font-semibold text-sm rounded-sm'>rules</div>
    )

}

export default Modal