const cityForm = document.querySelector('[data-js="change-location"]')
const nameContainer = document.querySelector('[data-js="name-Container"]')
const weatherContainer = document.querySelector('[data-js="weather-Container"]')
const temperatureContainer = document
  .querySelector('[data-js="temperature-Container"]')
const cityCard = document.querySelector('[data-js="city-card"]')
let timeImg = document.querySelector('[data-js="time"]')
const timeIconContainer = document.querySelector('[data-js="time-icon"]')

const showCityCard = () => {
  const isDisplayNoneValid = cityCard.classList.contains('d-none')
  
  if(isDisplayNoneValid){
    cityCard.classList.remove('d-none')
  }
}
const showWeatherInfo = async inputValue => {
  const [{Key, LocalizedName}] = await getCityData(inputValue)
  const [{WeatherText, Temperature, IsDayTime, WeatherIcon}] = await 
    getCityWeather(Key)
  const timeIcon = `<img src="./src/icons/${WeatherIcon}.svg"/>`
  

  timeIconContainer.innerHTML = timeIcon
  nameContainer.textContent = LocalizedName
  weatherContainer.textContent = WeatherText
  temperatureContainer.textContent = Temperature.Metric.Value
  IsDayTime ? timeImg.src = './src/day.svg' : timeImg.src = './src/night.svg'
}
const showLocalStorageCity = () => {
  const key = localStorage.getItem('key')
  
  if(key){
    showWeatherInfo(key)
    showCityCard()
  }
}

cityForm.addEventListener('submit',  event => {
  event.preventDefault()

  const inputValue = event.target.city.value
  
  showCityCard()
  showWeatherInfo(inputValue)
  localStorage.setItem('key', inputValue)
  cityForm.reset()
})
showLocalStorageCity()