import React, { useContext, useEffect, useRef, useState } from "react";
import owner from "../../assets/owner.svg";
import people from "../../assets/peopl.svg";
import pag from "../../assets/pag.svg";
import pen from "../../assets/RulerPen.svg";
import carry from "../../assets/karry.svg";
import mid from "../../assets/mid.svg";
import hard from "../../assets/hard.svg";
import semiSup from "../../assets/semiSupport.svg";
import support from "../../assets/support.svg";
import trash from "../../assets/TrashBinTrash.svg";
import line from "../../assets/Line.svg";
import linetop from "../../assets/Linetop.svg";
import gosearch from "../../assets/gosearch.svg";
import add from "../../assets/add.svg";
import sharebutton from "../../assets/sharebutton.svg";
import axios from "axios";
import { ApiDataContext } from "../../context/ApiDataContext";
import Member from "./Member";
import { heroes } from "../../utils/dotaHero";
import { ranks } from "../../utils/Ranks";
import callGame from "../../assets/CallGame.svg";
import exit from "../../assets/exit.svg";
import VolumeUp from "../../assets/VolumeUp.svg";
import UserModal from "./UserModal";


const CommandItem = (profile) => {

  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [descriptionValue, setDescriptionValue] = useState(
    profile.command.description
  );
  const data = useContext(ApiDataContext);
  console.log(data)
  const decode = decode_positions(
    profile.command.owner_game_profile.positions_code
  );
  const [position, setPosition] = useState([]);


  function handleLeave() {
    if (data) {
      axios.post(`${import.meta.env.VITE_BASE_API_URL}/api/search_teams/${profile.command._id}/leave`, null,
        {
          headers: {
            Authorization: `Bearer ${data.access}`,
          },
        }
      )
        .then((response) => {
          console.log(response.data);
          window.location.reload();
        });
    }
  }
  function handleDelete() {
    if (data) {
      axios.delete(`${import.meta.env.VITE_BASE_API_URL}/api/search_teams/${profile.command._id}/delete`, null,
        {
          headers: {
            Authorization: `Bearer ${data.access}`,
          },
        }
      )
        .then((response) => {
          console.log(response.data);
          window.location.reload();
        });
    }
  }
  useEffect(() => {

    for (let i = 0; i < decode.length; i++) {
      const element = decode[i];
      switch (element) {
        case 1:
          position.push(carry);
          break;
        case 2:
          position.push(mid);
          break;
        case 3:
          position.push(hard);
          break;
        case 4:
          position.push(semiSup);
          break;
        case 5:
          position.push(support);
          break;
        default:
          break;
      }
    }
  }, [data]);

  function decode_positions(code) {
    const positions = [];
    for (let i = 1; i <= 5; ++i) {
      if (code & (1 << (i - 1))) {
        positions.push(i);
      }
    }
    return positions;
  }
  function handleOpen() {
    setOpen(!open);
  }


  function handleBLur() {
    setEdit(false);
    axios
      .post(
        `${import.meta.env.VITE_BASE_API_URL}/api/search_teams/${
          profile.command._id
        }/set_description`,
        {
          description: descriptionValue,
        },
        {
          headers: {
            Authorization: `Bearer ${data?.access}`,
          },
        }
      )
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    setOpenModal();
  }
  function findUserByName(users, heroes) {
    const heroesUrl = [];
    for (let j = 0; j < heroes.length; j++) {
      const targetName = heroes[j];
      for (var i = 0; i < users.length; i++) {
        if (users[i].name === targetName) {
          heroesUrl.push(users[i].url);
        }
      }
    }
    return heroesUrl;
  }

  function findUrlByName(profile, heroes) {
    for (var i = 0; i < profile.length; i++) {
      if (profile[i].name === heroes) {
        return profile[i].url;
      }
    }
  }

  const UserRank = findUrlByName(
    ranks,
    profile.command.owner_game_profile.rank
  );
  const heroesUrl = findUserByName(
    heroes,
    profile.command.owner_game_profile.heroes
  );
  console.log(profile)
  const [openModal, setOpenModal] = useState(false)
  return (
    <>          
    <div className="command">

              {openModal && <UserModal profile={profile.command} setOpenModal={setOpenModal}/>}
      <div className="command-container">
        <div className="nicknameCommand">
          {profile.command.name}{" "}
          {profile.command.is_owner && <img src={owner} />}{" "}
        </div>
        <div className="imagesPag">
          <div className="numberPlayer">
            {1 + profile.command.members_game_profiles.length}
          </div>
          <img src={people} alt="" className="people" />
          <img src={pag} className="pag" onClick={handleOpen} />
        </div>
      </div>
      {open && (
        <div className="pagConteiner">
          <div className="description">
            <div className="descriptionTitle">
              Описание
              <img src={pen} alt="" onClick={() => setEdit(true)} />
            </div>

            <textarea
              className="descriptionContent"
              disabled={!edit}
              value={descriptionValue}
              onChange={(e) => {
                setDescriptionValue(e.target.value);
              }}
              autoFocus={edit}
              onBlur={handleBLur}
            />
            {edit && <hr className="descriptionHR" />}
          </div>
          <div className="teammates">
            <div className="teammateRank">
              <img src={UserRank} alt="" className="teammateRankImg" onClick={()=> setOpenModal(true)}/>
            </div>
            <div className="teammateInfo">
              <div className="">
                <div className="teammateName" onClick={()=> setOpenModal(true)}>
                  {profile.command.owner_game_profile.name}{" "}
                  <img src={owner} alt="" />{" "}
                </div>
                <div className="redact">
                {profile.command.owner_game_profile.is_you ?   <img src={pen}/>: <img src={trash} />}
                </div>
              </div>
              <img src={line} className="teammatesHr" />
              <div className="teammeteHeroes"  onClick={()=> setOpenModal(true)}>
                {heroesUrl.map((url) => (
                  <img src={url} className="teammeteHeroe"/>
                ))}
                {heroesUrl[0] && <img src={linetop} alt="" />}
                {position.map((url) => (
                  <img src={url} className="teammeteHeroe" />
                ))}
              </div>
            </div>
          </div>
          {profile.command.members_game_profiles.map((profile, id) => (
            <Member profile={profile} id={profile._id} setOpenModal={setOpenModal}/>
          ))}
          <div className="pagButtons">
            <img src={callGame} className="pagButton" />
            <div className="purpleCurcle">
              <img src={VolumeUp} className="pagButton" />
            </div>
            <div className="purpleCurcle">
              <img src={exit} className="pagButton" onClick={handleLeave} />
            </div>
          </div>
        </div>
      )}

    </div></>
  );
};

export default CommandItem;
