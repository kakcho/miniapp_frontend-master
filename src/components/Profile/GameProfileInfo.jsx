import React, { useContext, useEffect, useState } from "react";
import { ranks } from "../../utils/Ranks";
import "./Profile.css";
import trash from "../../assets/Trash Bin Trash.svg";
import rulepen from "../../assets/RulerPen.svg";
import pag from "../../assets/pag.svg";
import linetop from "../../assets/Linetop.svg";
import carry from "../../assets/karry.svg";
import mid from "../../assets/mid.svg";
import hard from "../../assets/hard.svg";
import semiSup from "../../assets/semiSupport.svg";
import support from "../../assets/support.svg";
import { heroes } from "../../utils/dotaHero";
import { Link } from "react-router-dom";
import { ApiDataContext } from "../../context/ApiDataContext";
import axios from "axios";

const GameProfileInfo = ({ profile }) => {
  const [gameprofileInfo, setGameProfileInfo] = useState(false);
  const [position, setPosition] = useState([]);
  const decode = decode_positions(profile.positions_code);
  const data = useContext(ApiDataContext);
  function handleDelete() {
    axios
      .delete(
        `${import.meta.env.VITE_BASE_API_URL}/api/game_profiles/${profile._id}`,
        {
          headers: {
            Authorization: `Bearer ${data?.access}`,
          },
        }
      )
      .then(function (response) {
        console.log(response);
      });
  }
  function findUserByName(users, heroes) {
    const heroesUrl = [];
    for (let j = 0; j < heroes.length; j++) {
      const targetName = heroes[j];
      for (var i = 0; i < users.length; i++) {
        if (users[i].name === targetName) {
          heroesUrl.push(users[i].url);
        }
      }
    }
   
    setHeroesUrl(heroesUrl)
    
  }
  const [heroesUrl, setHeroesUrl] = useState()

  useEffect(() => {
    findUserByName(heroes, profile.heroes)
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
  }, []);

  function decode_positions(code) {
    const positions = [];
    for (let i = 1; i <= 5; ++i) {
      if (code & (1 << (i - 1))) {
        positions.push(i);
      }
    }
    return positions;
  }

  return (
    <div className="gameProfiles">
      <div className="gameProfileUnPag">
        <h4 className="gameProfilesH4">{profile.name}</h4>
        <div className="iconsGameProfile">
          <img src={trash} alt="" className="trashGame"  onClick={handleDelete}/>
          <Link to={`/profilegame/${profile._id}`}><img src={rulepen} alt="" className="penGame" /></Link>
          <img
            src={pag}
            className="pagGame"
            onClick={() => {
              setGameProfileInfo(!gameprofileInfo);
            }}
          />
        </div>
      </div>
      {gameprofileInfo && (
        <div className="gameProfilePag">
          {heroesUrl?.map((url) => (
            <img src={url} className="gameProfileHeroes" />
          ))}
          {heroesUrl[0] && <img src={linetop} className="lineTopGame" />}
          {position.map((url) => (
            <img src={url} className="gameProfileHeroes" />
          ))}
        </div>
      )}
    </div>
  );
};

export default GameProfileInfo;
