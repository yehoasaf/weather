import { favoritesService } from '../../services/favoritesService'

export function getCurrWeather(){
  return async dispatch => {
    try {
      const currCityWeather = await favoritesService.getCurrWeather()
      dispatch({ type: 'GET_CURR_WEATHER', currCityWeather })
    } catch (err) {}
  }
}

export function addFavCity(favCity) {
  return async dispatch => {
    try {
      const addedFavCity = await favoritesService.save(favCity)
      dispatch({ type: 'ADD_FAV_CITY', favCity: addedFavCity })
    } catch (err) {}
  }
}

export function checkIfFav(cityKey){
  return async dispatch => {
    try {
      const isFaved = await favoritesService.checkIfFaved(cityKey)
      dispatch({ type: 'CHECK_IF_FAV', isFaved })
    } catch (err) {}
  }
}

export function removeFavorites(favCity){
  return async dispatch => {
    try {
      const updatedFavorites = await favoritesService.removeFav(favCity)
      dispatch({ type: 'REMOVE_FAVORITE', updatedFavorites })
    } catch (err) {}
  }
}

export function setCity(cityKey, cityName){
  return dispatch => {
    try {
      const city = {cityKey, cityName}
      dispatch({ type: 'SET_CURR_KEY', city })
    } catch (err) {}
  }
}