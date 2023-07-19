import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'

import Typography from '@mui/material/Typography';

import { SearchCity } from '../cmps/SearchCity';
import { CardUI } from '../cmps/CardUI';
import { ToggleButton } from '../helpers/ToggleButton.js'
import { Loading } from '../helpers/Loading.js'
import { Error } from '../helpers/Error.js'

import { utilityService } from '../services/utilityService.js'
import { weatherService } from '../services/weatherService.js'
import { favoritesService } from '../services/favoritesService.js'

import { checkIfFav } from '../store/actions/favoritesActions.js'
import { removeFavorites } from '../store/actions/favoritesActions.js'

export function Weather({ isLight }) {

  const dispatch = useDispatch()

  const { isFave } = useSelector(state => state.favoritesModule)
  const { currCity } = useSelector(state => state.favoritesModule)

  const [currWeather, setCurrWeather] = useState()
  const [forcast, setForcast] = useState()
  const [cityKey, setCityKey] = useState('215854')
  const [cityName, setCityName] = useState('')
  const [isCelsius, setIsCelsius] = useState(true)
  const [isError, setIsError] = useState(false)

  const style = { color: isLight ? 'black' : 'white' };

  useEffect(() => {
    if (currCity) {
      setCityKey(currCity.cityKey)
      setCityName(currCity.cityName)
    }
    fetchData(cityKey)
    dispatch(checkIfFav(cityKey))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cityKey, dispatch, isCelsius, currCity])

  useEffect(() => {
    getUserLocation()
  }, [])

  const getUserLocation = () => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords
      try {
        const locationData = await weatherService.getCityLocation(latitude, longitude)
        setCityName(locationData.LocalizedName)
        setCityKey(locationData.Key)
      } catch (err) {
        setIsError(true)
      }
    })
  }


  const fetchData = async (cityKey) => {
    if (cityKey === '215854') setCityName('Tel-Aviv')
    try {
      const currentWeather = await weatherService.getCurrWeather(cityKey)
      setCurrWeather(currentWeather)
    } catch (err) {
      setIsError(true)
    }
    try {
      const cityForcast = await weatherService.getForcast(cityKey, isCelsius)
      setForcast(cityForcast)
    } catch (err) {
      setIsError(true)
    }

  }

  const onSetCityKey = (cityKey, newCityName) => {
    setCityKey(cityKey)
    setCityName(newCityName)
  }

  const toggleFavorite = () => {
    if (isFave) {
      dispatch(removeFavorites(cityKey))
    } else {
      favoritesService.addFav(cityKey, cityName)
    }
    dispatch(checkIfFav(cityKey))
  }

  const handleToggle = () => {
    setIsCelsius(!isCelsius)
  }

  const handleIconId = (iconId) => {
    iconId = iconId.toString()
    if (iconId.length === 1) {
      iconId = ('0' + iconId);
    }
    const imgUrl = `https://developer.accuweather.com/sites/default/files/${iconId}-s.png`
    return imgUrl
  }

  const dailyText = (day) => {
    const txt1 = utilityService.getDayName(day.Date)
    const txt2 = `Min Temp: ${day.Temperature.Maximum.Value} °${day.Temperature.Maximum.Unit}`
    const txt3 = `Max Temp: ${day.Temperature.Minimum.Value} °${day.Temperature.Minimum.Unit}`
    const txtObj = { txt1, txt2, txt3 }
    return txtObj
  }

  if (isError) return <Error isLight={isLight}/>
  if (!currWeather || !forcast || forcast === undefined) return <Loading />

  const weather = currWeather[0]

  let { WeatherIcon } = weather
  WeatherIcon = handleIconId(WeatherIcon)

  return (
    <div className="weather-page-container" style={style}>

      <SearchCity onSetCityKey={onSetCityKey} setIsError={setIsError} isLight={isLight} />

      <div className="weather-container">
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} align="center">
          <ToggleButton isOn={isCelsius} handleToggle={handleToggle} isLight={isLight}
            txt={{ off: '°F', on: '°C' }} />
          <h1 className="city-name">{cityName}</h1>

          <button className="fav-toggle" onClick={toggleFavorite} style={{ backgroundColor: isLight ? '#FFFAFA' : '#FFFAFA' }}>
            <Typography variant="body1" component="div" sx={{ flexGrow: 1 }} align="center">
              {isFave ? 'Remove From Favorites' : 'Add To Favorites'}
            </ Typography>
          </button>

          {isCelsius ?
            (<div className="curr-temp" >{weather.Temperature.Metric.Value} °{weather.Temperature.Metric.Unit}</div>) :
            (<div className="curr-temp">{weather.Temperature.Imperial.Value} °{weather.Temperature.Imperial.Unit}</div>)
          }

          <img className="curr-weather-img" src={WeatherIcon} alt="" />
          <h2 className="weather-txt">{weather.WeatherText}</h2>

          <div className="forcast-container">
            {forcast.DailyForecasts.map((day) => {
              return (
                <div className="daily-forcast" key={day.EpochDate}>
                  <CardUI
                    imgId={day.Day.Icon}
                    txt={dailyText(day)}
                    isLight={isLight}
                  />
                </div>
              )
            })}
          </div>
          
        </ Typography>
      </div>

    </div>
  )
}