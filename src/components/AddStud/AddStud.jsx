import React, { useContext, useEffect, useState } from "react";
import addHeroImg from "../../assets/addHero.svg";
import hard from "../../assets/hard.svg";
import carry from "../../assets/karry.svg";
import mid from "../../assets/mid.svg";
import semiSupport from "../../assets/semiSupport.svg";
import fullSupport from "../../assets/support.svg";
import { heroes } from "../../utils/dotaHero";
import popupOpen from "../../assets/popupOpen.svg";
import { ranks } from "../../utils/Ranks";
import axios from "axios";
import { ApiDataContext } from "../../context/ApiDataContext";
import "./AddStud.css";
import { useParams } from "react-router-dom";

const AddStud = () => {
  const [isPopupOpenRank, setIsPopupOpenRank] = useState(false);
  const [selectedRank, setSelectedRank] = useState();
  const [selectedImages, setSelectedImages] = useState([]);
  const [gameNick, setGameNick] = useState();
  const { teamId } = useParams();
  const [gameData, setGameData] = useState({
    name: "",
    positions_code: [],
    heroes: [],
    rank: "",
  });
  const [butActive, setButACtive] = useState(true);
  const [selectedHero, setSelectedHero] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);


  const data = useContext(ApiDataContext);
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
    if (gameData.name && gameData.positions_code != 0) {
      setButACtive(false);
    } else {
      setButACtive(true);
    }
  }, [gameData.name, gameData.positions_code]);
  const handleSelectImage = (id) => {
    if (selectedImages.includes(id)) {
      // Если изображение уже выбрано, удаляем его из списка выбранных
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
    return result;
  };
  function handleSend() {

    axios
      .post(
        `${import.meta.env.VITE_BASE_API_URL}/api/search_teams/add_stub`,
        {
          search_team_id: teamId,
          stub: gameData,
        },

        {
          headers: {
            Authorization: `Bearer ${data.access}`,
          },
        }
      )
  }
  function handleClickRank() {
    setIsPopupOpenRank(!isPopupOpenRank);
  }
  function handleSelectRank(rank) {
    setSelectedRank(rank);
    setGameData({ ...gameData, rank: rank.name });
  }
  return (
    <div className="createProfile">
      <div className="title">Добавление игрока в команду</div>

      <label className="sup">
        Никнейм игрока <p className="star">*</p>
      </label>
      <div className="studHeader">
        <input
          id="gameProfileName"
          className="inputStud"
          value={gameNick}
          onChange={(e) => setGameNick(e.target.value)}
        />
        <div className="rankStud" onClick={handleClickRank}>
          <label className="helpLable">Ранг</label>
          <div className="country-item">
            <img src={selectedRank?.url} className="rankImg" />
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
                onClick={() => {
                  handleSelectRank(ranks);
                }}
                className="country-item"
              >
                <img src={ranks.url} className="rankImg" />
              </div>
            ))}
          </div>
        </div>
      </div>
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
      <label className="sup">
        Предпочитаемые герои
        <img
          src={addHeroImg}
          style={{ paddingLeft: "10px" }}
          alt=""
          onClick={() => setIsOpen(!isOpen)}
        />{" "}
      </label>
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
          {butActive ? <p>Сохранить</p> : <a href="/Find" onClick={()=> setButACtive(true)}>Сохранить</a>}
        </button>
        <a href="/Find">
          <button className="createBut" children={<>Отменить</>} />
        </a>
      </div>
    </div>
  );
};

export default AddStud;
