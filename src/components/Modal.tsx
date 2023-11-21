import { useState, useEffect } from 'react'
interface Props {
    text1: string;
    text2: string;
    text3: string;
    heading: string;
}

const Modal = ({ text1, text2, text3, heading }: Props) => {
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
            <div className="p-8 gap-2 py-4 absolute top-[30%] flex flex-col bg-stone-300 shadow-lg shadow-black rounded-sm max-w-lg">
                <span className="text-lg self-center first-letter:capitalize p-8 py-4 pb-8 font-semibold">{heading}</span>
                <span>{text1}</span>
                <span>{text2}</span>
                <span>{text3}</span>
                <button className="p-4 mt-6 self-center w-[13ch] px-2 font-semibold hover:bg-black hover:text-white rounded-sm" onClick={() => { setShow(false); rulesRead() }}>OK</button>
            </div>
        )
    }
    return (
        <div onClick={() => setShow(true)} className='absolute p-1 bg-stone-300/25 text-neutral-100 hover:text-neutral-900 hover:bg-stone-300 top-0 right-0 m-2 uppercase font-semibold text-sm rounded-sm'>rules</div>
    )

}

export default Modal