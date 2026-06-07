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
    <>
      <div className="fixed inset-0 -z-10 overflow-hidden bg-neutral-950">
        {/* Blob 1 — top left purple */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-purple-600/40 rounded-full blur-3xl " />
        {/* Blob 2 — top right indigo */}
        <div className="absolute -top-16 right-1/4 w-72 h-72 bg-indigo-500/30 rounded-full blur-3xl " />
        {/* Blob 3 — center violet */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-64 bg-violet-700/20 rounded-full blur-3xl" />
        {/* Blob 4 — bottom right pink */}
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-fuchsia-600/25 rounded-full blur-3xl " />
        {/* Blob 5 — bottom left blue */}
        <div className="absolute bottom-1/4 -left-16 w-64 h-64 bg-blue-700/20 rounded-full blur-3xl " />
      </div>
      <main className='min-h-screen max-w-7xl mx-auto flex flex-col relative z-0'>
        <Toaster position="bottom-right" />
        <Header />


        {
          weatherData && !loading ? (
            <div className="flex items-start h-full p-4 gap-4 flex-col md:flex-row overflow-y-auto">
              <div className="w-full md:w-5/12 lg:w-1/3 flex flex-col md:flex-col items-stretch justify-start space-y-4">
                <div className="bg-neutral-900/30 backdrop-blur-sm border border-neutral-300/20 p-4 rounded-lg shrink-0">
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

        <footer className='p-2 text-center border-t-2 border-slate-600 w-[85%] mx-auto mt-4'>
          <h1>Weather Board &copy; {new Date().getFullYear()}</h1>
          <p className="text-center text-sm text-purple-200 py-2">
            Made with <span className="text-red-500">♥</span> by{" "}
            <a
              href="https://github.com/AvatarN03"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-300 hover:text-yellow-400 hover:underline transition-colors tracking-wider"
            >
              AvatarN03
            </a>
          </p>

        </footer>


      </main>
    </>
  )
}

export default App