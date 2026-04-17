import { useEffect } from 'react'

import { Toaster } from 'react-hot-toast';

import { Header } from './components/Header'
import { CurrentWeather } from './components/CurrentWeather';
import { DailyForecast } from './components/DailyForecast';
import { Highlights } from './components/Highlights';
import { HourlyForecast } from './components/HourlyForecast';
import { Skeleton } from './components/Skeleton';
import DataNotAvailable from './components/DNA';

import useWeather from './context/useWeather';
import { WeatherMap } from './components/WeatherMap';

const App = () => {

  const { weatherData, getWeatherByCoordsData, loading } = useWeather();

  useEffect(() => {
    if (!weatherData) {
      getWeatherByCoordsData({});
    }
  }, [weatherData, getWeatherByCoordsData]);

  return (
    <main className='min-h-screen max-w-7xl mx-auto flex flex-col'>
      <Toaster position="bottom-right" />
      <Header />

      {
        weatherData && !loading ? (
          <div className="flex items-start h-full p-4 gap-4 flex-col md:flex-row overflow-y-auto">
            <div className="w-full md:w-5/12 lg:w-1/3 flex flex-col md:flex-col items-stretch justify-start space-y-4">
              <div className="bg-neutral-900/30 backdrop-blur-sm border border-neutral-300/20 p-4 lg:p-8 rounded-lg shrink-0">
                <CurrentWeather data={weatherData!} />
                <WeatherMap
                  lat={weatherData.location.lat}
                  lon={weatherData.location.lon}
                />
              </div>
              <div className="bg-neutral-800/30 backdrop-blur-sm border border-neutral-300/20 p-4 rounded-lg shrink-0">
                <h3 className="text-purple-200 mb-4">5 Days Forecast</h3>
                <DailyForecast daily={weatherData.daily} />
              </div>

            </div>

            <div className="w-full md:w-7/12 lg:w-2/3 flex items-start justify-start space-y-4 flex-col">
              <div className="bg-purple-650/30 backdrop-blur-sm border border-purple-500/20 p-4 lg:p-8 w-full rounded-lg">
                <Highlights data={weatherData!} />
              </div>

              <div className="bg-purple-650/30 backdrop-blur-sm border border-purple-500/20 p-4 lg:p-8 w-full  overflow-x-scroll rounded-lg">
                <HourlyForecast hourly={weatherData.hourly} />
              </div>


            </div>
          </div>
        ) : loading ? (
          <Skeleton />
        ) : (
          <DataNotAvailable />
        )
      }

    </main>
  )
}

export default App