const initialState = {
  favorites: null,
  isFave: null,
  currWeather: null,
  currCity: null
}

export function favoritesReducer(state = initialState, action = {}) {
  switch (action.type) {
    case 'ADD_FAV_CITY':
      return { ...state, favorites: [...state.favorites, action.addedFavCity] }
    case 'CHECK_IF_FAV':
      return { ...state, isFave: action.isFaved }
    case 'GET_CURR_WEATHER':
      return { ...state, currWeather: action.currCityWeather }
    case 'REMOVE_FAVORITE':
      return { ...state, favorites: action.updatedFavorites }
    case 'SET_CURR_KEY':
      return { ...state, currCity: action.city }
    default:
      return state
  }
}
