import React, { useEffect, useState } from 'react'
import './GameChoose.css'
import dota from '../../assets/Dota.svg'
import valorant from '../../assets/Valorant.svg'
import pubg from '../../assets/Pubg.svg'
import MobileLegens from '../../assets/MobileLegens.svg'
import CS2 from '../../assets/CS2.svg'
import axios from 'axios'

const GameChoose = () => {


  return (
    <div className='GameChoose'>
        <h1 className='title'>Выбрать игру</h1>
        <div className="games">
        <div className="game complete"><a href={"/createprofile"}><img src={dota} alt="" /></a></div>
        <div className="game"><img src={CS2} alt="" /></div>
        <div className="game"><img src={valorant}/></div>
        <div className="game"><img src={pubg}  /></div>
        <div className="game"><img src={MobileLegens}/></div>
        </div>
    </div>
  )
}

export default GameChoose