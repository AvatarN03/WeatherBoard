
import type { AirQuality } from '../types'
import { Wind } from 'lucide-react'

export const AQI = ({ data }: { data: AirQuality }) => {

    return (
        <div className="bg-neutral-800/30 border border-purple-500/20 backdrop-blur-sm p-4 rounded-lg h-full w-full">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-purple-200 font-semibold">Air Quality Index</h2>
                <p className="text-sm text-purple-900 bg-yellow-200 px-3 py-1 rounded-full">{data.level}</p>
            </div>
            <div className="flex items-start gap-4">
                <Wind className="w-10 h-10 text-purple-400 shrink-0 mt-1" />
                <div className="flex flex-wrap gap-8 w-full">
                    <div className="space-y-2 group cursor-pointer">
                        <h1 className="text-3xl font-light text-purple-100 group-hover:text-purple-400 transition-all duration-100">{data.pm2_5}</h1>
                        <p className="text-sm group-hover:text-base  text-purple-200 transition-all duration-50">PM2.5</p>
                    </div>
                    <div className="space-y-2 group cursor-pointer">
                        <h1 className="text-3xl font-light text-purple-100 group-hover:text-purple-400 transition-all duration-100">{data.so2}</h1>
                        <p className="text-sm group-hover:text-base  text-purple-200 transition-all duration-50">SO2</p>
                    </div>
                    <div className="space-y-2 group cursor-pointer">
                        <h1 className="text-3xl font-light text-purple-100 group-hover:text-purple-400 transition-all duration-100">{data.no2}</h1>
                        <p className="text-sm group-hover:text-base  text-purple-200 transition-all duration-50">NO2</p>
                    </div>
                    <div className="space-y-2 group cursor-pointer">
                        <h1 className="text-3xl font-light text-purple-100 group-hover:text-purple-400 transition-all duration-100">{data.o3}</h1>
                        <p className="text-sm group-hover:text-base  text-purple-200 transition-all duration-50">O3</p>
                    </div>
                    <div className="space-y-2 group cursor-pointer">
                        <h1 className="text-3xl font-light text-purple-100 group-hover:text-purple-400 transition-all duration-100">{data.co}</h1>
                        <p className="text-sm group-hover:text-base  text-purple-200 transition-all duration-50">CO</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
