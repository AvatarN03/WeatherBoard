
import { Wind } from 'lucide-react'

import { AQILevel } from './AQILevel'
import { PollutantItem } from './PollutantItem'

import type { AirQuality } from '../types'

export const AQI = ({ data }: { data: AirQuality }) => {

    return (
        <div className="bg-purple-800/20 border-2 border-purple-500/20 backdrop-blur-sm p-4 rounded-lg h-full w-full">
            <div className="flex items-center justify-between mb-1">
                <h2 className="text-purple-200 font-semibold">
                    Air Quality Index
                </h2>
                <AQILevel level={data.level} />
            </div>

            <p className="text-xs text-yellow-500 mb-3">
                All values in µg/m³
            </p>
            <div className="flex items-start gap-4">
                <Wind className="w-10 h-10 text-purple-400 shrink-0 mt-1" />
                <div className="flex flex-wrap gap-8 w-full">
                    <PollutantItem type="pm2_5" value={data.pm2_5} />
                    <PollutantItem type="so2" value={data.so2} />
                    <PollutantItem type="no2" value={data.no2} />
                    <PollutantItem type="o3" value={data.o3} />
                    <PollutantItem type="co" value={data.co} />
                </div>
            </div>
        </div>
    )
}
