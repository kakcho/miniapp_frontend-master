import React, { useContext, useEffect, useState } from "react";
import "./GameChoose.css";
import dota from "../../assets/Dota.svg";
import valorant from "../../assets/Valorant.svg";
import pubg from "../../assets/Pubg.svg";
import MobileLegens from "../../assets/MobileLegens.svg";
import CS2 from "../../assets/CS2.svg";
import axios from "axios";
import { ApiDataContext } from "../../context/ApiDataContext";
import { handleUrlParams } from "../hook/UrlParams";

const GameChoose = () => {
  handleUrlParams()
  const data = useContext(ApiDataContext);
  const [user, setUser] = useState(); 
  useEffect(() => {
    if (data) {
      axios
        .request({
          headers: {
            Authorization: `Bearer ${data.access}`
          },
          method: "GET",
          url: `${import.meta.env.VITE_BASE_API_URL}/api/users/current`,
        })
        .then((response) => {
          setUser(response.data);
        });
    }
  }, [data]);


  if (user){return (
    <div className="GameChoose">
      <h1 className="title">Выбрать игру</h1>
      <div className="games">
        <a
          href={user?.response.is_profile_filled ? "/profile" : "/createprofile"}
          className="game complete"
        >
          <img src={dota} alt="" />
        </a>
        <div className="game">
          <img src={CS2} alt="" />
        </div>
        <div className="game">
          <img src={valorant} />
        </div>
        <div className="game">
          <img src={pubg} />
        </div>
        <div className="game">
          <img src={MobileLegens} />
        </div>
      </div>
    </div>
  );}
};

export default GameChoose;
