import { Link, useLocation } from 'react-router-dom'

import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { ToggleButton } from '../helpers/ToggleButton.js'

export function Header({ isLight, setIsLight }) {

  const location = useLocation();
  const [headerClass, setHeaderClass] = useState('')
  const titleStyle = { color: isLight ? 'black' : 'white' };

  const weatherBtnStyle = {
    border: location.pathname === '/' && '2px solid',
    borderColor: isLight ? 'black' : 'white',
    color: isLight ? 'black' : 'white',
    borderRadius: '8px',
    padding: '3px'
  }

  const favoritesBtnStyle = {
    border: location.pathname === '/favorites' && '2px solid',
    borderColor: isLight ? 'black' : 'white',
    color: isLight ? 'black' : 'white',
    borderRadius: '8px',
    padding: '3px'
  }


  const handleToggle = () => {
    if (isLight) document.body.classList.add('body-dark');
    else (document.body.classList.remove('body-dark'))
    setIsLight(!isLight)
  }

  useEffect(() => {
    if (!isLight) setHeaderClass('-dark')
    else setHeaderClass('')
  }, [isLight, headerClass])

  const darkModeShadow = '0px 2px 4px -1px rgb(255 255 255), 0px 4px 5px 0px rgb(253 253 253), 0px 1px 10px 0px rgb(255 255 255 / 12%)'

  return (
    <div className={`header-container${headerClass}`} >
      <Box sx={{ flexGrow: 1 }} boxShadow={!isLight && darkModeShadow}>
        <AppBar position="static" color="transparent">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Link to={'/'} style={titleStyle}>wellcome J.B Weather - ברוכים הבאים</Link>
            </Typography>
            <div className="header-toggle">
              <ToggleButton
                isOn={isLight}
                handleToggle={handleToggle}
                txt={{ off: 'Dark Mode', on: 'Light Mode' }}
                isLight={isLight}
              />
            </div>
            <div className="header-btns-container">
              <Button color="inherit"><Link to={'/'} style={weatherBtnStyle}>Weather</Link></Button>
              <Button color="inherit"><Link to={'/favorites'} style={favoritesBtnStyle}>Favorites</Link></Button>
            </div>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}