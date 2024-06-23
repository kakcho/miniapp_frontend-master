import React, { useContext, useEffect, useState } from "react";
import Header from "../Header/Header";
import "./CreateProfile.css";
import popupOpen from "../../assets/popupOpen.svg";
import { ranks } from "../../utils/Ranks";
import Bar from "../Bar/Bar";
import GameProfile from "../GameProfile/GameProfile";
import axios from "axios";
import { ApiDataContext } from "../../context/ApiDataContext";
import { countries } from "../../utils/countries";

const CreateProfile = ({title}) => {
  const [nickname, setNickname] = useState();
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedRank, setSelectedRank] = useState("");
  const [bio, setBio] = useState();
  const [age, setAge] = useState();
  const [steamId, setSteamId] = useState("");
  const [discordNickname, setDiscordNickname] = useState("");
  const [star, setStar] = useState(true)
  const [starSteam, setStarSteam] = useState(true)
  const [butActive, setButACtive] = useState(false)
  const data = useContext(ApiDataContext);



  useEffect(()=>{
    if (nickname && steamId) {
      setButACtive(true)
    }else{
      setButACtive(false)
    }
  },[nickname, steamId])
  useEffect(()=>{
    if (nickname) {
      setStar(false)
    }else{
      setStar(true)
    }
  },[nickname])
  
  useEffect(()=>{
    if (steamId) {
      setStarSteam(false)
    }else{
      setStarSteam(true)
    }
  },[steamId])

  function sendData() {
    axios
      .patch(
        `${import.meta.env.VITE_BASE_API_URL}/api/users/current`,
        {    steam_id: steamId,
          discord_nickname: discordNickname,
          age: age,
          country_code: selectedCountry,
          game_data: {
            nickname: nickname,
            rank: selectedRank?.name,
            bio: bio,
          },},
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


  function handleSelectRank(rank) {
    setSelectedRank(rank);
    closePopupRank();
  }
  const [isPopupOpenRank, setIsPopupOpenRank] = useState(false);
  const closePopupRank = () => setIsPopupOpenRank(false);
  function handleSelect(country) {
    setSelectedCountry(country.value);
    setIsPopupOpen(false);
  }
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  function handleClick() {
    setIsPopupOpen(!isPopupOpen);
  }
  function handleClickRank() {
    setIsPopupOpenRank(!isPopupOpenRank);
  }
  
  function handleChange(event) {
    const newValue = event.target.value;

    // Проверяем, что длина введенной строки равна 17
    if (newValue.length <= 17) {
      // Проверяем, что все символы в строке являются цифрами
      if (/^\d+$/.test(newValue) ||  "" == newValue) {
        console.log(newValue)
        setSteamId(newValue);
      }
    }
  }
  function handleAgeChange(event) {
    const newValue = event.target.value;
    if (newValue.length < 3) {
      if (/^\d+$/.test(newValue)  ||  "" == newValue) {
        setAge(newValue);
      }
    }
    
   }
  return (
    <div className="createProfile">
      <Header title={"Заполните свой профиль"} />
      {star && <p className="star nick">*</p>}
      <input
        type="text"
        name="nickname"
        id="nickname"
        className="nickname"
        placeholder={`Никнейм`}
        value={nickname}
        onChange={(e) => {
          setNickname(e.target.value);
        }}
        required
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
              onClick={() => handleSelect(country)}
              className="country-item"
            >
              <div>{country.value}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="popup rank" onClick={handleClickRank}>
        <label className="helpLable">Ранг</label>
        <div className="country-item">
          <img src={selectedRank.url} className="rankImg" />
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
              onClick={() => handleSelectRank(ranks)}
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
        value={steamId}
        onChange={handleChange}
      />{" "}
      {starSteam && <p className="star steam-id">*</p>}
      <div className="row">
        <input
          type="text"
          placeholder="Никнейм в Discord"
          className="steam-id-input"
          value={discordNickname}
          onChange={(e) => {
            setDiscordNickname(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Возраст"
          className="ageCreate"
          value={age}
          onChange={handleAgeChange}
        />{" "}
      </div>
      <input
        type="text"
        placeholder="Коротко о себе"
        className="bioCreate"
        value={bio}
        onChange={(e) => {
          setBio(e.target.value);
        }}
      />
      {butActive && <a href="/profile">
        {" "}
        <button className="confirmCreate" type="submit" onClick={sendData}>
          Создать игровой профиль
        </button>
      </a>}
      <Bar />
    </div>
  );
};

export default CreateProfile;
