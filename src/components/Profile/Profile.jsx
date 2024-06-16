import React, { useContext, useEffect, useState } from "react";
import Header from "../Header/Header";

import popupOpen from "../../assets/popupOpen.svg";
import { ranks } from "../../utils/Ranks";
import Bar from "../Bar/Bar";
import { ApiDataContext } from "../../context/ApiDataContext";
import axios from "axios";
import { countries } from "../../utils/countries";
import './Profile.css'
import trash from '../../assets/Trash Bin Trash.svg'
import rulepen from '../../assets/RulerPen.svg'
import pag from '../../assets/pag.svg'

const CreateProfile = () => {
  const data = useContext(ApiDataContext);
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState();
  const [selectedRank, setSelectedRank] = useState();
  const [userData, setUserData] = useState( { age: user?.age,
    country_code: user?.country_code,
    discord_nickname: user?.discord_nickname,
    game_data: {
      nickname: user?.game_data.nickname,
      rank: user?.game_data.rank,
      bio: user?.game_data.bio,
    },
    is_profile_filled: user?.is_profile_filled,
    steam_id: user?.steam_id})
  const [gameprofileInfo, setGameProfileInfo] = useState(false)
  useEffect(() => {
    if (user?.game_data.rank) {
      const rangUrl = filterCountry(ranks, user?.game_data.rank)[0].url;
      setSelectedRank(rangUrl);
      setSelectedCountry(user.country_code);
      setUserData(user)
    }
  }, [user]);
  function filterCountry(rang, value) {
    return rang.filter((rang) => rang.name == value);
  }

  useEffect(() => {
    if (data) {
      axios
        .request({
          headers: {
            Authorization: `Bearer ${data?.access}`,
          },
          method: "GET",
          url: `${import.meta.env.VITE_BASE_API_URL}/api/users/current`,
        })
        .then((response) => {
          setUser(response.data.response);
          setLoading(false);
        });
    }
  }, [data]);

  function handleSelectRank(rank) {
    setSelectedRank(rank.url);
    setUserData({...userData, game_data:{rank: rank.name}})
    closePopupRank();
    handleClickApiSendRank(rank.name)
  }
  const [isPopupOpenRank, setIsPopupOpenRank] = useState(false);
  const closePopupRank = () => setIsPopupOpenRank(false);

  function handleSelect(country) {
    setSelectedCountry(country.value);
    setUserData({...userData, country_code: country.value})
    handleClickApiSend(country.value)
    setIsPopupOpen(false);
  }
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  function handleClick() {
    setIsPopupOpen(!isPopupOpen);
  }
  function handleClickRank() {
    setIsPopupOpenRank(!isPopupOpenRank);
  }
  function handleClickApiSend(country){
    axios
    .patch(
      `${import.meta.env.VITE_BASE_API_URL}/api/users/current`, {...userData, country_code:country}
      ,
      {
        headers: {
          Authorization: `Bearer ${data?.access}`,
        },
      }
    )
    .then( (response) => {
      console.log( response ) ;
    } )
  }
  function handleClickApiSendRank(rank){
    axios
    .patch(
      `${import.meta.env.VITE_BASE_API_URL}/api/users/current`, {...userData, game_data:{rank: rank}}
      ,
      {
        headers: {
          Authorization: `Bearer ${data?.access}`,
        },
      }
    )
    .then( (response) => {
      console.log( response ) ;
    } )
  }
  function handleBlur() {

    axios
      .patch(
        `${import.meta.env.VITE_BASE_API_URL}/api/users/current`, userData
        ,
        {
          headers: {
            Authorization: `Bearer ${data?.access}`,
          },
        }
      )
      .then( (response) => {
        console.log( response ) ;
      } )
  }
  function handleCliclRangAndCountry(e) {
    handleSelectRank(e.url)
  }


  useEffect(() => {
    if (data) {
      axios
        .request({
          headers: {
            Authorization: `Bearer ${data?.access}`,
          },
          method: "GET",
          url: `${import.meta.env.VITE_BASE_API_URL}/api/game_profiles/all`,
        })
        .then((response) => {
          console.log(response.data.response)
        });
    }
  }, [data]);
  if (!loading) {
    return (
      <div className="createProfile profile">
        <Header title={"Профиль"} />
        <input
          type="text"
          name="nickname"
          id="nickname"
          className="nickname"
          placeholder={`Никнейм`}
          value={userData?.game_data.nickname}
          onChange={(e) => {setUserData({...userData, game_data:{nickname: e.target.value}})}}
          required
          onBlur={handleBlur}
        />
        <div className="popup" onClick={handleClick}>
          <label className="helpLable">Страна</label>
          <div className="country-item contary">{selectedCountry}</div>
          <img src={popupOpen} className="popupOpen" />
          <div
            className="popup__content"
            style={{ display: isPopupOpen ? "block" : "none" }}
          >
            {countries.map((country) => (
              <div
                key={country.value}
                country={country}
                onClick={() => {handleSelect(country)}}
                className="country-item"
              >
                <div>{country.value}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="popup rank" onClick={handleClickRank} >
          <label className="helpLable">Ранг</label>
          <div className="country-item">
            <img src={selectedRank} className="rankImg" />
          </div>
          <img src={popupOpen} className="popupOpen" />
          <div
            className="popup__content"
            style={{ display: isPopupOpenRank ? "block" : "none" }}
          >
            {ranks.map((ranks, index) => (
              <div
                key={index}
                name={ranks.name}
                onClick={() => {handleSelectRank(ranks)}}
                className="country-item"
              >
                <img src={ranks.url} className="rankImg" />
              </div>
            ))}
          </div>
        </div>
        <input
          type="text"
          placeholder="Steam id"
          className="steam-id-input"
          required
          value={userData?.steam_id}
          onChange={(e) => {setUserData({...userData, steam_id: e.target.value})}}
          onBlur={handleBlur}
        />{" "}
        <div className="row">
          <input
            type="text"
            placeholder="Никнейм в Discord"
            className="steam-id-input"
            value={userData?.discord_nickname}
            onChange={(e) => {setUserData({...userData, discord_nickname: e.target.value})}}
            onBlur={handleBlur}
          />
          <input
            type="text"
            placeholder="Возраст"
            className="ageCreate"
            value={userData?.age}
            onChange={(e) => {setUserData({...userData, age: e.target.value})}}
            onBlur={handleBlur}
          />{" "}
        </div>
        <input
          type="text"
          placeholder="Коротко о себе"
          className="bioCreate"
          value={userData?.game_data.bio}
          onBlur={handleBlur}
          onChange={(e) => {setUserData({...userData, game_data:{bio: e.target.value}})}}
        />
        <a></a>
        <p className="gameprofileTitle">Игровые Профили:</p>
        <div className="gameProfiles">
          <h4 className="gameProfilesH4">Рояль на миду</h4>
          <div className="iconsGameProfile">
            <img src={trash} alt="" className="trashGame"/>
            <img src={rulepen} alt="" className="penGame"/>
            <img src={pag}  className="pagGame"/>
            
            {/* {gameprofileInfo && } */}
          </div>
        </div>
        <Bar />
      </div>
    );
  }
};

export default CreateProfile;
