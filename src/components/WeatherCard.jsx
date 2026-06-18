const getWeatherLabel = (code) => {
  switch (code) {
    case 0:
      return 'Clear sky'
    case 1:
    case 2:
    case 3:
      return 'Partly cloudy'
    case 45:
    case 48:
      return 'Foggy'
    case 51:
    case 53:
    case 55:
      return 'Drizzle'
    case 61:
    case 63:
    case 65:
      return 'Rain'
    case 66:
    case 67:
      return 'Freezing rain'
    case 71:
    case 73:
    case 75:
      return 'Snow'
    case 80:
    case 81:
    case 82:
      return 'Showers'
    case 95:
    case 96:
    case 99:
      return 'Thunderstorm'
    default:
      return 'Weather'
  }
}

const WeatherCard = ({ weather }) => {
  const current = weather?.current
  const units = weather?.current_units

  if (!current || !units) {
    return null
  }

  const label = getWeatherLabel(current.weather_code)

  return (
    <section className="weather-card">
      <div className="weather-top">
        <div>
          <p>{weather.location}{weather.country ? `, ${weather.country}` : ''}</p>
          <h3>{label}</h3>
        </div>
      </div>
      <div className="temp">
        {Math.round(current.temperature_2m)}{units.temperature_2m}
      </div>
      <p>Feels like {Math.round(current.apparent_temperature)}{units.apparent_temperature}</p>
    </section>
  )
}

export default WeatherCard
