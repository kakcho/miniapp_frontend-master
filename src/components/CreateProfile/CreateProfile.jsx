import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import "./CreateProfile.css";
import popupOpen from "../../assets/popupOpen.svg";
import { ranks } from "../../utils/Ranks";
import Bar from '../Bar/Bar'
import GameProfile from "../GameProfile/GameProfile";
import axios from "axios";
import { retrieveLaunchParams } from '@tma.js/sdk';


const { initDataRaw, initData } = retrieveLaunchParams();
const CreateProfile = () => {
  
  const [selectedCountry, setSelectedCountry] = useState();
  const [selectedRank, setSelectedRank] = useState();
  const [appState, setAppState] = useState();



  const countries = [
    { value: "RU", label: "Россия" },
    { value: "UKR", label: "Украина" },
    { value: "BY", label: "Белоруссия" },
  ];
  function handleSelectRank(rank) {
    setSelectedRank(rank);
    closePopupRank();
  }
  const [isPopupOpenRank, setIsPopupOpenRank] = useState(false);
  const openPopupRank = () => setIsPopupOpenRank(true);
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
  return (
    <div className="createProfile">
      <Header title={"Заполните свой профиль"} />
      <p className="star nick">*</p>
      <input
        type="text"
        name="nickname"
        id="nickname"
        className="nickname"
        placeholder={`Никнейм`}
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
              onClick={() => handleSelectRank(ranks.url)}
              className="country-item"
            >
              <img src={ranks.url} className="rankImg" />
            </div>
          ))}
        </div>
      </div>
      <input type="text" placeholder="Steam id" className="steam-id-input" required/>{" "}
      <p className="star steam-id">*</p>
      <div className="row">
        <input
          type="text"
          placeholder="Никнейм в Discord"
          className="steam-id-input"
        />
        <input type="text" placeholder="Возраст" className="ageCreate" />{" "}
      </div>
      <input type="text" placeholder="Коротко о себе" className="bioCreate" /> 

      <a href="/createprofilegame" > <button className="confirmCreate" type="submit">Создать игровой профиль</button></a>
      {initData}
      <Bar/>
    </div>
  );
};

export default CreateProfile;
