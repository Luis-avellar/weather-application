const APIKey = 'BzS8XaNEMrDFADqJwgITeJSdMWhztjGs'
const getCityUrl = cityName => 
`http://dataservice.accuweather.com/locations/v1/cities/search?&apikey=${APIKey}&q=${cityName}`

const getRequestData = async url => await fetch(url) 
const getCityData = async cityName => {
  try{
    const cityUrl = getCityUrl(cityName)
    const response = await getRequestData(cityUrl)
    
    if(!response.ok){
      throw new Error('Não foi possível obter os dados.')
    }
    const [cityData] = await response.json()
    return cityData
  }catch({name, message}){
    alert(`${name}: ${message}`)
  }
}
const getCityWeather = async cityName => {
  try{
    const {Key} = await getCityData(cityName)
    const cityWeatherUrl = `http://dataservice.accuweather.com/currentconditions/v1/${Key}?apikey=${APIKey}&language=pt-br`
    const response = await getRequestData(cityWeatherUrl)

    if(!response.ok){
      throw new Error('Não foi possível obter os dados.')
    }
    const [cityWeatherData] = await response.json()

    return cityWeatherData
  }catch({name, message}){
    alert(`${name}: ${message}`)
  }
}
getCityWeather('Recife')
  .then(resolve => console.log(resolve))