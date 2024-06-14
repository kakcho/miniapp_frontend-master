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
  let config = {
    headers: {
      authorization:'TGMA user=%7B%22id%22%3A1022917596%2C%22first_name%22%3A%22Andrew%22%2C%22last_name%22%3A%22C%22%2C%22username%22%3A%22AndrewE01%22%2C%22language_code%22%3A%22en%22%2C%22allows_write_to_pm%22%3Atrue%7D&chat_instance=-2479719773736095853&chat_type=sender&auth_date=1717748777&hash=f5062cdf16251c020b0628a5e54b13ab96a70ba66da0623c32ef6532c722176c'
  }}

  useEffect(() => {
    const apiUrl = (`${import.meta.env.VITE_BASE_API_URL}/api/auth/jwt_by_init_data`);
     axios.get(apiUrl, config).then((resp) => {
      const okey = resp.statusText;
      setOk(okey);
    });
  }, [setOk]);

  return (
    <div className='GameChoose'>
     
        <h1 className='title'>Выбрать игру</h1>
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