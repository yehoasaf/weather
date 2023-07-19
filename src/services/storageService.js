import { weatherService } from './weatherService'

export const storageService = {
    query,
    save,
    checkIfSaved,
    getCurrWeatherByKey,
    removeCity
}


let gFavCities = []

function query(STORAGE_KEY) {
    const entities = JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
    gFavCities = entities
    return entities
}
    
function save(STORAGE_KEY, cityKey, cityName) {
    const entities = JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
    if (entities.some(entity => entity.cityKey === cityKey)) return
    gFavCities = entities
    gFavCities.push({cityKey, cityName})
    localStorage.setItem(STORAGE_KEY, JSON.stringify(gFavCities))
    return gFavCities
}

function checkIfSaved(STORAGE_KEY, cityKey){
    const entities = JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
    if (entities.some(entity => entity.cityKey === cityKey)) return true
}

async function getCurrWeatherByKey(STORAGE_KEY){
    const { getCurrWeather } = weatherService
    const entities = JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
    gFavCities = entities
    const prms = gFavCities.map(async (city)=>{
        const { cityKey, cityName } = city
        const currCityWeather = await getCurrWeather(cityKey)
        return {currCityWeather, cityKey, cityName}
    })
    return Promise.all(prms)
}

async function removeCity(STORAGE_KEY, cityKey){
    const entities = JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
    gFavCities = entities
    const idx = gFavCities.findIndex(city => city.cityKey === cityKey)
    gFavCities.splice(idx, 1)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(gFavCities))
    return gFavCities
}