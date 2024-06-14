import React, { useEffect, useState } from 'react'
import './GameChoose.css'
import dota from '../../assets/Dota.svg'
import valorant from '../../assets/Valorant.svg'
import pubg from '../../assets/Pubg.svg'
import MobileLegens from '../../assets/MobileLegens.svg'
import CS2 from '../../assets/CS2.svg'
import axios from 'axios'
import { parseInitData } from '@tma.js/sdk';

const GameChoose = () => {

  const [ok, setOk] = useState();


  useEffect(() => {
    const apiUrl = (`${import.meta.env.VITE_BASE_API_URL}/api/auth/jwt_by_init_data`);
    axios.get(apiUrl).then((resp) => {
      const okey = resp.statusText;
      setOk(resp);

    }, {
      headers: {
        authorization: window.Telegram.WebApp.initData
      }});
  }, []);
  console.log(parseInitData(window.Telegram.WebApp.initData))
  return (
    <div className='GameChoose'>
     
        <h1 className='title'> {ok}</h1>
        <div className="games">
        <a href={ok === 'OK' ? "/createprofile" : '/profile'} className='game complete'><img src={dota} alt="" /></a>
        <div className="game"><img src={CS2} alt="" /></div>
        <div className="game"><img src={valorant}/></div>
        <div className="game"><img src={pubg}  /></div>
        <div className="game"><img src={MobileLegens}/></div>
        </div>
    </div>
  )
}

export default GameChoose