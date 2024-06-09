import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Tutor from '../components/Tutor/Tutor'
import '../App.css'
import Find from '../components/Find/Find'
import Profile from '../components/Profile/Profile'
import CreateProfileGame from '../components/CreateProfileGame/CreateProfileGame'
import CreateProfile from '../components/CreateProfile/CreateProfile'
import GameChoose from '../components/GameChoose/GameChoose'


const RoutesSwitch = () => {
  return (
    <Routes>
        <Route path='/' element={<GameChoose/>} exact/>
        <Route path='/Find' element={<Find/>} />
        <Route path='/profile' element={<Profile/>} />
        <Route path='/createprofilegame' element={<CreateProfileGame/>}/>
        <Route path='/createprofile' element={<CreateProfile/>}/>
    </Routes>
  )
}

export default RoutesSwitch
