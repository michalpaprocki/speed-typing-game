import { useEffect, useState } from "react"

interface Props {
    stop: boolean;
    start: boolean
}
const Timer = ({ stop, start }: Props) => {
    const [time, setTime] = useState(0)
    const [intervaleId, setIntervalId] = useState<NodeJS.Timeout>()


    const measureTime = () => {

        const id = setInterval(() => setTime(prev => prev += 1), 1000)
        setIntervalId(id)
    }
    const stopMeasureTime = () => {
        clearInterval(intervaleId)
        setTime(0)
    }
    useEffect(() => {
        if (start) {
            measureTime()
        }
    }, [start])
    useEffect(() => {
        if (start) {
            measureTime()
        }
    }, [start])
    useEffect(() => {
        if (stop) {
            stopMeasureTime()
        }
    }, [stop])
    return (
        <span className="p-2 font-bold text-[3rem] text-white">{time}</span>
    )
}

export default Timer