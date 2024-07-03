import React, { useContext, useEffect, useState } from "react";
import dwn from "../../assets/Arrowdwn.svg";
import axios from "axios";
import { ApiDataContext } from "../../context/ApiDataContext";


const ChooseProfile = ({token, setOpenModal}) => {
   const [isOpen, setIsOpen] = useState(false);
  const [profiles, setProfiles] = useState()

  const [selected, setSelected] = useState(profiles ? profiles[0]?.name : '');

  const data = useContext(ApiDataContext);



  function findUserByName(users, name) {
    for (var i = 0; i < users?.length; i++) {
      if (users[i].name === name) {
        return users[i];
      }
    }
  }

  function handleChangeProfile() {
    axios.post(`${import.meta.env.VITE_BASE_API_URL}/api/search_teams/join`,{
        invite_token: token,
        game_profile_id: findUserByName(profiles, selected)._id
    },{
        headers: {
            Authorization: `Bearer ${data.access}`
          }
    })
    setOpenModal(false)
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
          setProfiles(response.data.response);
        });

    }
  }, [data]);
  useEffect(()=>{
    if (profiles) {
      setSelected(profiles[0]?.name)
    }
  },[profiles])



 if(profiles){ return (
    <div className="changeModal" >
      <div className="blur">
        
          {profiles[0]  ?(<>


            <label htmlFor="chooseProfile" className="Changemodal-chooseProfileLable">
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
               {profiles.map((profile) => (
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
            <button className="modal-button" onClick={handleChangeProfile}>
              Поменять игровой профиль
            </button>
          </>): (
          <div className="GameNot">
            <p className="modalP ">У вас нет игрового профиля</p>
            <a href="/createprofilegame" className="a">
              <button className="modal-button" onClick={()=> setOpenModal(false)} >
                Создать
              </button>
            </a>
          </div>
        )}
        

      
      </div>
    </div>
  );}
}

export default ChooseProfile