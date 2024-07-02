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
import { ApiDataContext, TransparencyContext } from "../../context/ApiDataContext";
import Member from "../Command/Member";
import { heroes } from "../../utils/dotaHero";
import { ranks } from "../../utils/Ranks";
import logout from '../../assets/Logout.svg'
import { ChangeModal } from "./ChangeModal";
import { useSse } from "../hook/UseSse";
import { initUtils } from "@tma.js/sdk";


const CommandFind = (profile) => {
  const {event, setEvent} = useContext(TransparencyContext)
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [descriptionValue, setDescriptionValue] = useState(
    profile.command.description
  );
  const [isOwner, setIsOwner] = useState()
  const data = useContext(ApiDataContext);
  const decode = decode_positions(
    profile.command.owner_game_profile.positions_code
  );
  const [position, setPosition] = useState([]);

  useEffect(()=>{
    setIsOwner(profile.command.owner_game_profile.is_you)
  },[])


  function handleLeave(params) {
    axios
    .post(
      `${import.meta.env.VITE_BASE_API_URL}/api/search_teams/${
        profile.command._id
      }/leave`, null,
      {
        headers: {
          Authorization: `Bearer ${data?.access}`,
        },
      }
    )
    .then(function (response) {
      window.location.reload();
    });
  }

  function handleDelete() {
    axios
      .delete(
        `${import.meta.env.VITE_BASE_API_URL}/api/search_teams/${
          profile.command._id
        }/delete`,
        {
          headers: {
            Authorization: `Bearer ${data?.access}`,
          },
        }
      )
      .then(function (response) {
        window.location.reload();
      });
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
 
  const [token, setToken] = useState()
  useEffect(()=> {
    if(isOwner){axios({
      method: "get",
      url: `${import.meta.env.VITE_BASE_API_URL}/api/search_teams/invite_token`,
      headers: {
        Authorization: `Bearer ${data?.access}`,
      },
      params: {
        search_team_id: profile.command._id,
      },
    }).then(function (response) {
      setToken(response.data.response);
    });}
  },[data])




  
  const handleShare = () => {
    window.Telegram.WebApp.openTelegramLink(
      `https://t.me/share/url?url=https://t.me/younitelmg_bot/younite?startapp=join_dota2_${token}`
    );
  };



  function handleRemove() {

    if (data) {
      axios.post(`${import.meta.env.VITE_BASE_API_URL}/api/search_teams/${id}/remove_member`,{
        game_profile_id: profile._id
      },
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

  const [openChangeModal,setOpenChangeModal] = useState(false)
  const {start_search, closeSSE, confirm} = useSse(profile.command._id)
  return (
    <div className="command">
      {openChangeModal && <ChangeModal name={profile.command.name} setOpenModal={setOpenChangeModal} id={profile.command._id}/>}

      <div className={`command-container ${profile.command.status=="active" ? 'inFind' : ''}`} inFind onClick={() => setOpenChangeModal(false)}>
        <div className="command-containerHeader">
        <div className="nicknameCommand">
          {profile.command.name}{" "}
          {profile.command.is_owner && <img src={owner} />}{" "}
        </div>
        {profile.command.status=="active" && <div className="inFindTitle">В поиске</div>}
        <div className="imagesPag">
          <div className="numberPlayer">
            {1 + profile.command.members_game_profiles.length}
          </div>
          <img src={people} alt="" className="people" />
          <img src={pag} className="pag" onClick={handleOpen} />
        </div>
        </div>
      </div>
      {open && (
        <div className={`pagConteiner ${profile.command.status=="active" ? 'inFind' : ''}`}>
          <div className="description">
            <div className="descriptionTitle">
              Описание
              {isOwner && <img src={pen} alt="" onClick={() => setEdit(true)} />}
            </div>

            <input
              className="descriptionContent"
              disabled={!(edit && isOwner)}
              value={descriptionValue}
              onChange={(e) => {
                setDescriptionValue(e.target.value);
              }}
              autoFocus={edit}
              onBlur={handleBLur}
            />
            {edit && isOwner && <hr className="descriptionHR" />}
          </div>
          <div className="teammates" >
            <div className="teammateRank">
              <img src={UserRank} alt="" className="teammateRankImg"/>
            </div>
            <div className="teammateInfo">
              <div className="">
                <div className="teammateName" >
                  {profile.command.owner_game_profile.name}{" "}
                  <img src={owner} alt="" />{" "}
                </div>
                <div className="redact">
                  {isOwner ? <><img src={pen} onClick={()=>{setOpenChangeModal(!openChangeModal)}} /> </> : profile.command.owner_game_profile.is_you && <><img src={pen} onClick={()=>{setOpenChangeModal(!openChangeModal)}} /><img src={logout}  /> </>}
                </div>
              </div>
              <img src={line} className="teammatesHr" />
              <div className="teammeteHeroes" >
                {heroesUrl.map((url) => (
                  <img src={url} className="teammeteHeroe" />
                ))}
                {heroesUrl[0] && <img src={linetop} alt="" />}
                {position.map((url) => (
                  <img src={url} className="teammeteHeroe" />
                ))}
              </div>
            </div>
          </div>
          {profile.command.members_game_profiles.map((member, id) => (
            <Member isOwner={isOwner} profile={member} id={profile.command._id}  setOpenModal={setOpenChangeModal} find={true}/>
          ))}
         {isOwner && <div className="pagButtons">
            <a className="pagA" ><img src={gosearch} onClick={start_search} className="pagButton"/></a>
            <img
              src={sharebutton}
              className="pagButtonfind"
              onClick={handleShare}
            />
            <a href={`/addStud/${profile.command._id}`} className="pagA"><img src={add} className="pagButtonfind" /></a>
            <img src={trash} className="trash" onClick={handleDelete} />
          </div>}
        </div>
      )}
    </div>
  );
};

export default CommandFind;
