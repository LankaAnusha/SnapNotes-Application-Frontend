import React, { useState } from 'react'
import Header from './Header';
import Signin from './Signin';
import Signup from './Signup';
import Details from './Details';
import {useLocation,Routes,Route } from 'react-router-dom';
import MainComponent from './MainComponent';
export const UserContext=React.createContext('')

function Application(props) {
  let {state}=useLocation()
  const [trash,setTrash]=useState(false)
  const [all,setAllNotes]=useState(true)
  const [fav,setFav]=useState(false)
  const [darktheme,setDarktheme]=useState(false)
  const handleTrash=()=>{
    setTrash(true)
    setAllNotes(false)
    setFav(false)
  }
  function handleAllNotes(){
    setAllNotes(true)
    setFav(false)
    setTrash(false)
  }
  function handleFavNotes(){
    setFav(true)
    setAllNotes(false)
    setTrash(false)
  }
  function handleDarkTheme(){
    setDarktheme(true)
    props.DarkTheme()
  }
  function handleLightTheme(){
    setDarktheme(false)
    props.LightTheme()
  }
    return (  <>
      <Routes>
        <Route path='/' element={<><Header state={state} trash={handleTrash} allnotes={handleAllNotes} favnotes={handleFavNotes} handleLightTheme={handleLightTheme} handleDarkTheme={handleDarkTheme}/>
        {state?(
        <>
        <UserContext.Provider value={state.UserId}>
          {trash && <MainComponent Trash={trash}/>}
          {all && <MainComponent allnotes={all}/>}
          {fav && <MainComponent fav={fav}/>}
        </UserContext.Provider>
        </>):(
       <Details darktheme={darktheme}/>
       )}
        </>}/>
        <Route path="/Signin" element={<Signin />} />
        <Route path="/Signup" element={<Signup />} />
      </Routes>
    </>);
}

export default Application;
