import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux'

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { makeStyles } from "@material-ui/core/styles";

import { weatherService } from '../services/weatherService.js'

import { setCity } from '../store/actions/favoritesActions.js'

export function SearchCity({ onSetCityKey, isLight }) {

    const useStyles = makeStyles({
        root: {
            "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                borderColor: !isLight && "grey"
            },
            "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                borderColor: !isLight && "white"
            },
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: !isLight && "#73a7eb"
            },
            "& .MuiOutlinedInput-input": {
                color: !isLight && "white"
            },
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
                color: !isLight && "white"
            },
            "& .MuiInputLabel-outlined": {
                color: !isLight && "grey"
            },
            "&:hover .MuiInputLabel-outlined": {
                color: !isLight && "white"
            },
            "& .MuiInputLabel-outlined.Mui-focused": {
                color: !isLight && "#73a7eb"
            }
        }
    });

    const classes = useStyles();

    const dispatch = useDispatch()

    const [searchRes, setSearchRes] = useState([])
    const [userInput, setUserInput] = useState('')
    const [searchResClass, setSearchResClass] = useState('-invisible')

    const handleInput = async (ev) => {
        ev.preventDefault()
        const { value } = ev.target
        try {
            
            setUserInput(value)
            const results = await weatherService.setSearchRes(value)
            const filteredResults = results.slice(0, 5)
            setTimeout(() => {
                setSearchRes(filteredResults)
            }, 500); 
        } catch (err) {}
    }

    const handleSelected = (cityKey, cityName) => {
        dispatch(setCity(cityKey, cityName))
        onSetCityKey(cityKey, cityName)
        setUserInput('')
    }

    useEffect(()=>{
        if (searchRes.length > 0 && isLight) setSearchResClass('')
        if (searchRes.length > 0 && !isLight) setSearchResClass('-dark')
        if (userInput === '') setSearchResClass('-invisible')
    }, [userInput, searchRes, searchResClass, isLight])

    let resRef = useRef()

    useEffect(()=>{

        let handler = (ev) =>{
            if (!resRef.current.contains(ev.target)){
                setUserInput('')
            }
        }

        document.addEventListener("mousedown", handler)

        return () =>{
            document.removeEventListener("mousedown", handler)
        }
    })



    return <div className="search-container">
        <Box
            type="text"
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"

        >
            <TextField
                className={classes.root}
                id="outlined-basic"
                label="Search City"
                variant="outlined"
                onChange={handleInput}
                value={userInput}
                />
        </Box>

        <div ref={resRef} className={`search-results${searchResClass}`}>
            {userInput && searchRes.map((city) => {
                return (
                    <div
                        className="search-result"
                        key={city.Key}
                        onClick={() => handleSelected(city.Key, city.LocalizedName)}>
                        {city.LocalizedName}
                    </div>
                )
            })}
        </div>
    </div>
}