import React, { useState } from 'react';
import Weather from './weather/Weather';
import './App.css';
import NavBar from './navbar/NavBar';
import BusScheduleList from './bus_schedule/BusScheduleList';
import { Screen } from './shared/models/Screen';

function App() {

  const [currentScreen, setCurrentScreen] = useState(Screen.Weather);

  return (
    <div className='app'>
      <NavBar setScreen={(s) => {setCurrentScreen(s)}}/>
      {currentScreen == Screen.Weather && <Weather/>}
      {currentScreen == Screen.Bus && <BusScheduleList/>}
    </div>
  );
}

export default App;
