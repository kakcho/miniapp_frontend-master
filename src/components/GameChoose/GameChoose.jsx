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
  const testInit = 'user=%7B%22id%22%3A869219969%2C%22first_name%22%3A%22%F0%9F%A7%9D%E2%80%8D%E2%99%82%EF%B8%8F%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22daaya1%22%2C%22language_code%22%3A%22ru%22%2C%22allows_write_to_pm%22%3Atrue%7D&chat_instance=-8318441471056915332&chat_type=sender&auth_date=1718359552&hash=3e7049ce63620e9303357699b46869f024dec8234d4ca0f1a729aada11c40e0e'
  parseInitData(testInit)
  const [ok, setOk] = useState();


  useEffect(() => {
    const apiUrl = (`${import.meta.env.VITE_BASE_API_URL}/api/auth/jwt_by_init_data`);
     axios.get(apiUrl).then((resp) => {
      const okey = resp.statusText;
      setOk(okey);
      console.log(resp)
    }, {
      headers: {
        authorization: window.Telegram.WebApp.initData
      }});
  }, [setOk]);
  console.log(parseInitData(testInit))
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