import React, { useContext, useState } from "react";
import dwn from "../../assets/Arrowdwn.svg";
import axios from "axios";
import { ApiDataContext } from "../../context/ApiDataContext";

export const Modal = ({ setOpenModal, create }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(create ? create[0]?.name : '');
  const [nickName, setNickName] = useState()
  const data = useContext(ApiDataContext);

  function findUserByName(users, name) {
    for (var i = 0; i < users.length; i++) {
      if (users[i].name === name) {
        return users[i];
      }
    }
  }
  const createProfile = {
    name: nickName,
    game_profile_id: findUserByName(create, selected)?._id,
  };

  function handleSend(){
    axios.post(`${import.meta.env.VITE_BASE_API_URL}/api/search_teams/create`,
      createProfile, {headers: {
        Authorization: `Bearer ${data?.access}`
      }}
    ).then(function (response) {
      console.log(response);
      location.reload()
    })
    .catch(function (error) {
      console.log(error);
    });
    setOpenModal()
  }

  return (
    <div className="modal" >
      <div className="blur">
        {create[0] ? (
          <>
            <input
              type="text"
              placeholder="Назовите команду"
              className="nickname-modal"
              value={nickName}
              onChange={(e)=>{setNickName(e.target.value)}}
            />

            <label htmlFor="chooseProfile" className="modal-chooseProfileLable">
              {" "}
              Выберите игровой профиль{" "}
            </label>
            <select
              value={selected}
              id="chooseProfile"
              className="modal-chooseProfile"
              onChange={(e) => {
                setSelected(e.target.value);
              }}
            >
              {create.map((profile) => (
                <option id={profile._id} value={profile.name}>
                  {profile.name}
                </option>
              ))}
            </select>

            <img
              src={dwn}
              className="dwn"
              onClick={() => {
                setIsOpen(!isOpen);
              }}
            />
            <button className="modal-button" onClick={handleSend} disabled={nickName ? false : true}>
              Создать команду
            </button>
          </>
        ) : (
          <div className="GameNot">
            <p className="modalP ">У вас нет игрового профиля</p>
            <a href="/createprofilegame" className="a">
              <button className="modal-button" onClick={()=> setOpenModal()} >
                Создать
              </button>
            </a>
          </div>
        )}
      </div>
    </div>
  );
};
