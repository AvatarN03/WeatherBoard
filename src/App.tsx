import { Suspense } from 'react'
import { Header } from './components/Header'
import useWeather from './context/useWeather';
import { CurrentWeather } from './components/CurrentWeather';
import { DailyForecast } from './components/DailyForecast';
import { Highlights } from './components/Highlights';
import { HourlyForecast } from './components/HourlyForecast';

const App = () => {

  const { weatherData } = useWeather();

  return (
    <main className='min-h-screen max-w-7xl mx-auto flex flex-col'>
      <Header />
      <Suspense fallback={<div className='text-purple-200 text-center mt-10'>Loading...</div>}>
        {
          weatherData ? (
            <div className="flex items-start h-full p-4 gap-4 flex-col md:flex-row overflow-y-auto">
              <div className="w-full md:w-1/4 flex flex-col md:flex-col items-stretch justify-start space-y-4">
                <div className="bg-purple-450/20 backdrop-blur-sm border border-purple-500/20 p-4 md:p-8 rounded-lg shrink-0">
                  <CurrentWeather data={weatherData!} />
                </div>
                <div className="bg-purple-550/30 backdrop-blur-sm border border-purple-500/20 p-4 md:p-8 rounded-lg shrink-0">
                  <h3 className="text-purple-200 mb-4">5 Days Forecast</h3>
                  <DailyForecast daily={weatherData.daily} />
                </div>
              </div>

              <div className="w-full md:w-3/4 flex items-start justify-start space-y-4 flex-col">
                <div className="bg-purple-650/30 backdrop-blur-sm border border-purple-500/20 p-4 md:p-8 w-full rounded-lg">
                  <Highlights data={weatherData!} />
                </div>
                <h3 className="text-purple-300">Today Hourly</h3>
                <div className="bg-purple-950/40 backdrop-blur-sm border border-purple-500/20 p-4 md:p-8 w-full  overflow-x-scroll rounded-lg">
                  <HourlyForecast hourly={weatherData.hourly} />
                </div>
              </div>
            </div>
          ) : (
            <div className='text-purple-200 text-center mt-10'>No data available</div>
          )
        }
      </Suspense>
    </main>
  )
}

export default App