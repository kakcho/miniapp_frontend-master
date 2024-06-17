import React, { useContext, useEffect, useState } from "react";
import "./GameChoose.css";
import dota from "../../assets/Dota.svg";
import valorant from "../../assets/Valorant.svg";
import pubg from "../../assets/Pubg.svg";
import MobileLegens from "../../assets/MobileLegens.svg";
import CS2 from "../../assets/CS2.svg";
import axios from "axios";
import { ApiDataContext } from "../../context/ApiDataContext";

const GameChoose = () => {
  const data = useContext(ApiDataContext);
  const [user, setUser] = useState();

  console.log(window.Telegram.WebApp.initData)


  useEffect(() => {
    if (data) {
      axios
        .request({
          headers: {
            Authorization: `Bearer ${data?.access}`,
            'Content-Type':  'application/json',
          },
          method: "GET",
          url: `${import.meta.env.VITE_BASE_API_URL}/api/users/current/`,
        })
        .then((response) => {
          setUser(response.data);
        });
    }
  }, [data]);


  return (
    <div className="GameChoose">
      <h1 className="title">Выбрать игру</h1>
      <div className="games">
        <a
          href={user?.response.is_profile_filled? "/profile" : "/createprofile"}
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
  );
};

export default GameChoose;
