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

  const data = useContext(ApiDataContext);





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
          window.location.reload();
        });
    }
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
    setOpenModal();
  }


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
            {profile.command.game_profiles.length}
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
            </div>

            <textarea
              className="descriptionContent"
              disabled={true}
              value={profile.command.description}
              onChange={(e) => {
                setDescriptionValue(e.target.value);
              }}
              onBlur={handleBLur}
            />
            {edit && <hr className="descriptionHR" />}
          </div>
       
          {profile.command.game_profiles.map((profile) => (
            <Member profile={profile} id={profile._id} setOpenModal={setOpenModal}/>
          ))}


            <div className="purpleCurcle">
              <img src={exit} className="pagButton" onClick={handleLeave} />
            </div>
          </div>

      )}

    </div></>
  );
};

export default CommandItem;
