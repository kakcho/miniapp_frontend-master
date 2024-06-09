import React, { useState } from "react";
import Bar from "../Bar/Bar";
import "./CreateProfile.css";
import carry from "../../assets/karry.svg";
import mid from "../../assets/mid.svg";
import hard from "../../assets/hard.svg";
import semiSupport from "../../assets/semiSupport.svg";
import fullSupport from "../../assets/support.svg";
import addHeroImg from "../../assets/addHero.svg";
import { heroes } from "../../utils/dotaHero";

const CreateProfileGame = () => {
  const [selectedImages, setSelectedImages] = useState([]);

  const handleSelectImage = (id) => {
    if (selectedImages.includes(id)) {
      // Если изображение уже выбрано, удаляем его из списка выбранных
      setSelectedImages(selectedImages.filter((imgId) => imgId !== id));
    } else {
      // Если изображение еще не выбрано, добавляем его в список выбранных
      setSelectedImages([...selectedImages, id]);
    }
  };
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleCheckboxChange = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((x) => x !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
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
  return (
    <div className="createProfile">
      <div className="title">Создание профиля</div>
      <label className="sup">
        Название игрового профиля <p className="star">*</p>
      </label>
      <input id="gameProfileName" className="input" />
      <label className="sup">
        Игровые позиции <p className="star">*</p>
      </label>
      <div className="positions">
        <img
          src={mid}
          className="position"
          onClick={() => handleSelectImage("mid")}
          id="mid"
          style={{
            border: selectedImages.includes("mid") ? "#8d8bff solid 4px" : "",
          }}
        />
        <img
          src={carry}
          className="position"
          onClick={() => handleSelectImage("carry")}
          id="carry"
          style={{
            border: selectedImages.includes("carry") ? "#8d8bff solid 4px" : "",
          }}
        />
        <img
          src={hard}
          className="position"
          onClick={() => handleSelectImage("hard")}
          id="hard"
          style={{
            border: selectedImages.includes("hard") ? "#8d8bff solid 4px" : "",
          }}
        />
        <img
          src={semiSupport}
          className="position"
          onClick={() => handleSelectImage("semiSupport")}
          id="semiSupport"
          style={{
            border: selectedImages.includes("semiSupport")
              ? "#8d8bff solid 4px"
              : "",
          }}
        />
        <img
          src={fullSupport}
          className="position"
          onClick={() => handleSelectImage("fullSupport")}
          id="fullSupport"
          style={{
            border: selectedImages.includes("fullSupport")
              ? "#8d8bff solid 4px"
              : "",
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
                  checked={selectedOptions.includes(heroes.url)}
                  onChange={() => handleCheckboxChange(heroes.url)}
                />
              </li>
            ))}
          </ul>
        )}
        <div>
          {selectedOptions.map((hero) => (
            <img src={hero} className="selectedHero" />
          ))}
        </div>
      </div>
      <div className="buttons">
        <button className="createBut confirm" children={<>Сохранить</>} />
        <button className="createBut" children={<>Отменить</>} />
      </div>
    </div>
  );
};

export default CreateProfileGame;
