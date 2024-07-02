import React, { useContext, useEffect, useState } from "react";
import addHeroImg from "../../assets/addHero.svg";
import hard from "../../assets/hard.svg";
import carry from "../../assets/karry.svg";
import mid from "../../assets/mid.svg";
import semiSupport from "../../assets/semiSupport.svg";
import fullSupport from "../../assets/support.svg";
import { heroes } from "../../utils/dotaHero";
import "./GameProfiles.css";
import axios from "axios";
import { ApiDataContext } from "../../context/ApiDataContext";
import { useParams } from "react-router-dom";

const GameProfile = () => {
  const profileID = Number(useParams().profilegameId);
  const data = useContext(ApiDataContext);
  const [gameProfiles, setGameProfiles] = useState();
  const [gameProfile, setGameProfile] = useState();
  const [selectedImages, setSelectedImages] = useState([]);
  const [gameNick, setGameNick] = useState();
  const [gameData, setGameData] = useState({
    name: "",
    positions_code: null,
    heroes: [],
  });
  const [butActive, setButACtive] = useState(true);
  const [selectedHero, setSelectedHero] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  function findUserById(profile, id) {
    for (var i = 0; i < profile?.length; i++) {
      if (profile[i]._id === id) {
        return profile[i];
      }
    }
    return null; // Или undefined, если null нежелателен
  }
  function findUserByName(profile, heroes) {
    const heroesOpt = []
    for (let j = 0; j < profile?.length; j++) {
      const element = profile[j];
      for (var i = 0; i < heroes.length; i++) {
        if (heroes[i].name === element) {
          heroesOpt.push(heroes[i])
        }
      }
    }
    return heroesOpt; // Или undefined, если null нежелателен
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
          setGameProfiles(response.data.response);
        });
    }
  }, [data]);

  useEffect(() => {
    setGameProfile(findUserById(gameProfiles, profileID));
    setGameNick(gameProfile?.name);
    setSelectedImages(decode_positions(gameProfile?.positions_code));
    setSelectedOptions(findUserByName( gameProfile?.heroes, heroes));
    setLoading(true);
  }, [gameProfiles, gameProfile]);


  useEffect(() => {
    setGameData({
      ...gameData,
      positions_code: code_positions(selectedImages),
    });
  }, [selectedImages]);

  useEffect(() => {
    setGameData({ ...gameData, name: gameNick });
  }, [gameNick]);

  useEffect(() => {
    setGameData({ ...gameData, heroes: selectedHero });
  }, [selectedHero]);


  useEffect(() => {
    if (gameNick && selectedImages[0]) {
      setButACtive(false);
    } else {
      setButACtive(true);
    }
  }, [gameNick, selectedImages, selectedOptions]);



  const handleSelectImage = (id) => {
    if (selectedImages.includes(id)) {
      setSelectedImages(selectedImages.filter((imgId) => imgId !== id));

    } else {
      // Если изображение еще не выбрано, добавляем его в список выбранных
      setSelectedImages([...selectedImages, id]);
    }
  };

  const handleCheckboxChange = (option) => {
    setSelectedOptions(selectedOptions.filter((opt) => opt.url !== option.url));
    if (selectedOptions.length >= 5) return;
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((x) => x.url !== option.url));
      setSelectedHero(selectedHero.filter((x) => x !== option.name));
    } else {
      setSelectedOptions([...selectedOptions, option]);
      setSelectedHero([...selectedHero, option.name]);
    }
  };

  const [searchTerm, setSearchTerm] = React.useState("");
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const [searchResults, setSearchResults] = React.useState([]);


  React.useEffect(() => {
    const results = heroes.filter((heroes) =>
      heroes.localized_name.toLowerCase().includes(searchTerm)
    );
    setSearchResults(results);
  }, [searchTerm]);


  const [isOpen, setIsOpen] = useState(false);
  const code_positions = (positions) => {
    let result = 0;
    for (let i = 0; i < positions.length; ++i) {
      result |= 1 << (positions[i] - 1);
    }
    if(result===0){return null}
    return result;
  };

  function handleSend() {
    axios
      .patch(
        `${import.meta.env.VITE_BASE_API_URL}/api/game_profiles/${profileID}`,
        gameData,
        {
          headers: {
            Authorization: `Bearer ${data?.access}`,
          },
        }
      )
      .then(function (response) {
      });
  }


  if (loading) {
    return (
      <div className="createProfile">
              <div onClick={() => setIsOpen(false)} >
        <div className="title">Игровой профиль</div>
        <label className="sup">
          Название игрового профиля <p className="star">*</p>
        </label>
        <input
          id="gameProfileName"
          className="inputGameProfile"
          value={gameNick}
          onChange={(e) => setGameNick(e.target.value)}
        />
        <label className="sup">
          Игровые позиции <p className="star">*</p>
        </label>
        <div className="positions">
          <img
            src={carry}
            className="position"
            onClick={() => handleSelectImage(1)}
            id="carry"
            style={{
              border: selectedImages.includes(1) ? "#8d8bff solid 4px" : "",
            }}
          />
          <img
            src={mid}
            className="position"
            onClick={() => handleSelectImage(2)}
            id="mid"
            style={{
              border: selectedImages.includes(2) ? "#8d8bff solid 4px" : "",
            }}
          />
          <img
            src={hard}
            className="position"
            onClick={() => handleSelectImage(3)}
            id="hard"
            style={{
              border: selectedImages.includes(3) ? "#8d8bff solid 4px" : "",
            }}
          />
          <img
            src={semiSupport}
            className="position"
            onClick={() => handleSelectImage(4)}
            id="semiSupport"
            style={{
              border: selectedImages.includes(4) ? "#8d8bff solid 4px" : "",
            }}
          />
          <img
            src={fullSupport}
            className="position"
            onClick={() => handleSelectImage(5)}
            id="fullSupport"
            style={{
              border: selectedImages.includes(5) ? "#8d8bff solid 4px" : "",
            }}
          />
        </div>
        </div>
        <label className="sup">
          Предпочитаемые герои
          <img
            src={addHeroImg}
            style={{ paddingLeft: "10px" }}
            alt=""
            onClick={() => setIsOpen(!isOpen)}
          />{" "}
        </label>
        <div onClick={() => setIsOpen(false)} className="closeModal"></div>
        <div className="pickedHero">
          {isOpen && (
            <ul className="dropdown">
              <input
                type="text"
                className="find"
                placeholder="Поиск"
                value={searchTerm}
                onChange={handleChange}
              />
              {searchResults.map((heroes) => (
                <li key={heroes.id} className="hero">
                  <p className="heroInfo">
                    <img src={heroes.url} alt="" className="heroInfoImg" />
                    {heroes.localized_name}
                  </p>
                  <input
                    type="checkbox"
                    checked={selectedOptions.includes(heroes)}
                    onChange={() => handleCheckboxChange(heroes)}
                  />
                </li>
              ))}
            </ul>
          )}
          <div>
            {selectedOptions.map((hero) => (
              <img src={hero.url} className="selectedHero" key={hero.name} />
            ))}
          </div>
        </div>
        <div className="buttons">
          <button
            onClick={handleSend}
            className="createBut confirm"
            disabled={butActive}
          >
            {butActive ? <p>Сохранить</p> : <a href="/profile">Сохранить</a>}
          </button>
          <a href="/profile">
            <button className="createBut" children={<>Отменить</>} />
          </a>
        </div>
      </div>
    );
  }
};

export default GameProfile;
