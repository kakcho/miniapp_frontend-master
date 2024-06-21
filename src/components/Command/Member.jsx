import React, { useContext, useEffect, useState } from 'react'
import trash from '../../assets/TrashBinTrash.svg'
import line from '../../assets/Line.svg'
import linetop from '../../assets/Linetop.svg'
import carry from "../../assets/karry.svg";
import mid from "../../assets/mid.svg";
import hard from "../../assets/hard.svg";
import semiSup from "../../assets/semiSupport.svg";
import support from "../../assets/support.svg";
import { heroes } from '../../utils/dotaHero';
import { ApiDataContext } from '../../context/ApiDataContext';
import pen from "../../assets/RulerPen.svg";
import axios from 'axios';
import { ranks } from '../../utils/Ranks';
import { ChangeModal } from '../Find/ChangeModal';

const Member = ({profile, id, setOpenModal}) => {
  const data = useContext(ApiDataContext);

    const decode = decode_positions(profile.positions_code);
    const [position, setPosition] = useState([]);



    function findUrlByName(users, heroes) {
      const heroesUrl = [];
      for (let j = 0; j < heroes.length; j++) {
        const targetName = heroes[j];
        for (var i = 0; i < users.length; i++) {
          if (users[i].name === targetName) {
            heroesUrl.push(users[i].url);
          }
        }
      }
      console.log(heroesUrl)
      return heroesUrl;
    }


    const heroesUrl = findUrlByName(
      heroes,
      profile.heroes
    );
   
    console.log(heroesUrl)
        for (let i = 0; i < decode.length; i++) {
          const element = decode[i];
          switch (element) {
            case 1:
              position.push(carry);
              break;
            case 2:
              position.push(mid);

              break;
            case 3:
              position.push(hard);
              break;
            case 4:
              position.push(semiSup);
              break;
            case 5:
              position.push(support);
              break;
            default:
              break;
          }
        }
        function handleRemove() {

          if (data) {
            axios.post(`${import.meta.env.VITE_BASE_API_URL}/api/search_teams/${id}/remove_member`,{
              game_profile_id: profile._id
            },
              {
                headers: {
                  Authorization: `Bearer ${data.access}`,
                },
              }
            )
              .then((response) => {
                console.log(response.data);
                window.location.reload();
              });
          }
        }
    
      function decode_positions(code) {
        const positions = [];
        for (let i = 1; i <= 5; ++i) {
          if (code & (1 << (i - 1))) {
            positions.push(i);
          }
        }
        return positions;
      }
      function findUserByName(ranks, rank) {
          for (var i = 0; i < ranks.length; i++) {
            if (ranks[i].name === rank) {
              return ranks[0].url
            }
          }
      }

      const rankUrl =  findUserByName(ranks, profile.rank)

  return (
    <div className="teammates">
    <div className="teammateRank">
    <img  src={rankUrl} className="teammateRankImg"  onClick={()=>{setOpenModal(true)}}/>
    </div>
    <div className="teammateInfo">
      <div className="">
          <div className="teammateName"  onClick={()=>{setOpenModal(true)}}>{profile.name} </div>
          <div className="redact">{profile.is_you ?   <img src={pen} onClick={()=>setOpenModal(true)}/>: <img src={trash} onClick={handleRemove}/>}</div>
          </div>
          {<img src={line} className="teammatesHr"/>}
          <div className="teammeteHeroes"  onClick={()=> setOpenModal(true)}>
                {heroesUrl.map((url) => (
                  <img src={url} className="teammeteHeroe"/>
                ))}
                {heroesUrl[0] && <img src={linetop} alt="" />}
                {position.map((url) => (
                  <img src={url} className="teammeteHeroe" />
                ))}
              </div>
    </div>
               
</div>
  )
}

export default Member