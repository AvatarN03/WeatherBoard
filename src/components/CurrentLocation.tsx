import { LocateFixed } from 'lucide-react'

import useWeather from '../context/useWeather';

export const CurrentLocation = () => {

    const {getWeatherByCoordsData} = useWeather();

    return (
        <button onClick={()=>getWeatherByCoordsData({})} className='flex items-center gap-1 justify-center bg-purple-900 text-white p-2 rounded-xl cursor-pointer hover:bg-purple-500 transition-colors active:scale-95'>
            <LocateFixed className="w-5 h-5 text-white" />
            <p className="text-xs font-normal text-yellow-200">Get Weather</p>
        </button>
    )
}
