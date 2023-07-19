import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom'

import { Header } from './cmps/Header'
import { Weather } from './pages/Weather.jsx';
import { Favorites } from './pages/Favorites.jsx';


export function App() {

  const [isLight, setIsLight] = useState(true);
  
  return (
    <div className="app">
      <Header isLight={isLight} setIsLight={setIsLight} />
      <main>
        <Switch>
          <Route path='/favorites'>
          <Favorites isLight={isLight}/>
          </Route>
          <Route exact path='/'props={isLight}>
          <Weather isLight={isLight} />
          </Route>
        </Switch>
      </main>
    </div>
  )
}