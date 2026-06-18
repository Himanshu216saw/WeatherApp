import { useEffect, useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import SearchBar from './components/SearchBar'
import WeatherCard from './components/WeatherCard'
import Loader from './components/Loader'
import Footer from './components/Footer'

function App() {
  const [city, setCity] = useState('London')
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchWeather = async (query) => {
    setLoading(true)
    setError('')

    try {
      const geoResponse = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=1&language=en&format=json`
      )

      if (!geoResponse.ok) {
        throw new Error('Unable to search for the city')
      }

      const geoData = await geoResponse.json()
      const location = geoData.results?.[0]

      if (!location) {
        throw new Error('City not found')
      }

      const weatherResponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,apparent_temperature,weather_code&timezone=auto`
      )

      if (!weatherResponse.ok) {
        throw new Error('Unable to fetch weather data')
      }

      const data = await weatherResponse.json()
      setWeather({
        ...data,
        location: location.name,
        country: location.country,
      })
    } catch (err) {
      setError(err.message || 'Something went wrong')
      setWeather(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchWeather(city)
  }, [])

  return (
    <div className="app-shell">
      <Navbar />
      <main className="app-content">
        <SearchBar
          value={city}
          onChange={setCity}
          onSubmit={() => fetchWeather(city)}
        />
        {loading && <Loader />}
        {error && <p className="error-message">{error}</p>}
        {weather && !loading && <WeatherCard weather={weather} />}
      </main>
      <Footer />
    </div>
  )
}

export default App
