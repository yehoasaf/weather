export const weatherService = {
    setSearchRes,
    getCurrWeather,
    getForcast,
    getCityLocation
}

const apiKey = '6Vm8epxv7AL3KJpX6is9Xm5LtAIOmc5p'
// const cityKey = "215854"



async function getCurrWeather(cityKey) {
    const api = `https://dataservice.accuweather.com/currentconditions/v1/${cityKey}?apikey=${apiKey}&details=false`
    return new Promise(async (res, rej) => {
        try {
            const response = await fetch(api)
            const item = await response.json()
            return res(item)
        } catch (err) {
            return rej(err)
        }
    })
}

async function getForcast(cityKey, isCelsius) {
    const api = `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${cityKey}?apikey=${apiKey}&metric=${isCelsius}`
    return new Promise(async (res, rej) => {
        try {
            const response = await fetch(api)
            const item = await response.json()
            return res(item)
        } catch (err) {
            return rej(err)
        }
    })
}

async function setSearchRes(userInput) {
    return new Promise(async (res, rej) => {
        try {
            const autoCompleteApi = `https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${apiKey}&q=${userInput}`
            const response = await fetch(autoCompleteApi)
            const item = await response.json()
            return res(item)
        } catch (err) {
            return rej(err)
        }
    })
}

async function getCityLocation(lat, lan) {
    const api = `https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${apiKey}&q=${lat}%2C%20${lan}`
    return new Promise(async (res, rej) => {
        try {
            const response = await fetch(api)
            const item = await response.json()
            return res(item)
        } catch (err) {
            return rej(err)
        }
    })
}
