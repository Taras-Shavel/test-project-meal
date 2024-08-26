import React from 'react';
import './App.css';
import { InfoMeal, MainPage, Meals } from './components';
import { Route, Routes } from 'react-router-dom';
import { MainLayouts } from './layouts';

function App() {
  return (
    <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly'}}>
      <Routes>
        <Route path='/category' element={<MainLayouts/>}>
        <Route index  element={<MainPage/>}/>
        <Route path='/category/:id' element={<Meals/>}/>
        <Route path='/category/meals/:id' element={<InfoMeal/>}/>
        </Route>
      </Routes>
      
    </div>
  );
}

export default App;
