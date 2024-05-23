import React from 'react';
import ReactDOM from 'react-dom';
import Application from './Components/Application'
import './Styles/Application_Style.css'
import { BrowserRouter } from 'react-router-dom';
function handleDarkTheme(){
  const ele=document.querySelector('.application')
  const ele1=document.querySelector('.main')
  ele1.style.backgroundColor='black'
  ele.style.backgroundColor='black'
}
function handleLightTheme(){
  const ele=document.querySelector('.application')
  const ele1=document.querySelector('.main')
  ele1.style.backgroundColor='rgb(229,225,225'
  ele.style.backgroundColor='rgb(229, 225, 225)'
}
ReactDOM.render( <React.StrictMode>
  <BrowserRouter> 
  <div className='main'>
  <div className='application'><Application DarkTheme={handleDarkTheme} LightTheme={handleLightTheme}/></div>
  </div>
  </BrowserRouter>
</React.StrictMode>,document.getElementById('root'));

