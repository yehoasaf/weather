import { storageService } from './storageService'

export const favoritesService = {
    query,
    addFav,
    checkIfFaved,
    getCurrWeather,
    getForcast,
    removeFav
}

const STORAGE_KEY = 'favCities'

async function query() {
    const favs = storageService.query(STORAGE_KEY)
    return favs
}

async function addFav(cityKey, cityName){
    return storageService.save(STORAGE_KEY, cityKey, cityName)
}

async function checkIfFaved(cityKey){
    return storageService.checkIfSaved(STORAGE_KEY, cityKey)
}

async function getCurrWeather(){
    return storageService.getCurrWeatherByKey(STORAGE_KEY)
}

async function getForcast(){
    return storageService.getForcastByKey(STORAGE_KEY)
}

async function removeFav(favCity){
    return storageService.removeCity(STORAGE_KEY, favCity)
}