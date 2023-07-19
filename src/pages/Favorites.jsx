import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { CardUI } from '../cmps/CardUI';
import { NoFavs } from '../cmps/NoFavs'
import Typography from '@mui/material/Typography';
import { getCurrWeather, removeFavorites, setCity } from '../store/actions/favoritesActions.js'


//// favorits component/////
export function Favorites({ isLight }) {

  ////using redax stored data////
  const dispatch = useDispatch()
  const { currWeather } = useSelector(state => state.favoritesModule)

  useEffect(() => {
    dispatch(getCurrWeather())
  }, [dispatch])

  ///// removes city from favorites////
  const handleRemove = (ev, cityKey) => {
    ev.preventDefault()
    dispatch(removeFavorites(cityKey))
    dispatch(getCurrWeather())
  }
 //// 
  const handleLink = (cityKey, cityName) => {
    dispatch(setCity(cityKey, cityName))
  }
  ///// handleing card texted details ////
  const setCardTxt = (city) => {
    const txt1 = city.cityName
    const txt2 = city.currCityWeather[0].WeatherText
    const txt = { txt1, txt2 }
    return txt
  }
 //// conditional loading -
  if (!currWeather || currWeather.length < 1) return <NoFavs isLight={isLight}/>

  return (
    <div className="favorites-page-container">

      <div className="favorites-title">
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} align="center" color={!isLight && 'white'}>
          <h1>My Favorites</h1>
        </ Typography>
      </div>

      <div className="favorites-container">
        {currWeather.map((favCity) => {
          return (
            <div className="fav-city-container" key={favCity.cityKey}>
              <Link key={favCity.cityKey} to={'/'} onClick={() => handleLink(favCity.cityKey, favCity.cityName)}>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} align="center">
                  <CardUI
                    txt={setCardTxt(favCity)}
                    imgId={favCity.currCityWeather[0].WeatherIcon}
                    btn={handleRemove}
                    data={favCity}
                    isLight={isLight}
                  />
                </ Typography>
              </Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}