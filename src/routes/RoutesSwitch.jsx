import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Tutor from '../components/Tutor/Tutor'
import '../App.css'
import Find from '../components/Find/Find'
import Profile from '../components/Profile/Profile'
import CreateProfileGame from '../components/CreateProfileGame/CreateProfileGame'
import CreateProfile from '../components/CreateProfile/CreateProfile'
import GameChoose from '../components/GameChoose/GameChoose'
import GameProfile from '../components/GameProfile/GameProfile'
import Command from "../components/Command/Command";
import FindCommand from '../components/FindCommand/FindCommand'


const RoutesSwitch = () => {
  return (
    <Routes >
        <Route path='/' element={<GameChoose/>} exact/>
        <Route path='/Find' element={<Find/>} />
        <Route path='/profile' element={<Profile/>} />
        <Route path='/createprofilegame' element={<CreateProfileGame/>}/>
        <Route path='/createprofile' element={<CreateProfile/>}/>
        <Route path="/profilegame/:profilegameId" element={<GameProfile/>}/>
        <Route path='/tutor' element={<Tutor/>} />
        <Route path='/command' element={<Command/>}/>
        <Route path='/FindCommand' element={<FindCommand/>}/>
    </Routes>
  )
}

export default RoutesSwitch
