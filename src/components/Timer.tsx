import { useEffect, useState } from "react"

interface Props {
    callback: () => void;
    start: boolean;
    limit: string;
}
const Timer = ({ callback, start, limit }: Props) => {
    const [time, setTime] = useState(parseInt(limit)*60)
    const [intervaleId, setIntervalId] = useState<NodeJS.Timeout>()




    const measureTime = () => {
        const id = setInterval(() => {

            setTime(prev => prev -= 1)
        }, 1000);
        setIntervalId(id)
    }
    useEffect(() => {
        setTime(parseInt(limit)*60)
    }, [limit])

    useEffect(() => {
        if (start) {
            measureTime()
        }
    }, [start])
    useEffect(() => {
        if (time === 0) {

            clearInterval(intervaleId)
            callback()
            setTime(parseInt(limit)*1)
        }
    }, [time])
    return (
        <span className="p-2 font-bold text-[3rem] text-white">{time}</span>
    )
}

export default Timer