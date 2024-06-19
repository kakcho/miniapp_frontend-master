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
import Member from "../Command/Member";
import { heroes } from "../../utils/dotaHero";
import { ranks } from "../../utils/Ranks";

const CommandFind = (profile) => {
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [descriptionValue, setDescriptionValue] = useState(
    profile.command.description
  );
  const data = useContext(ApiDataContext);
  const decode = decode_positions(
    profile.command.owner_game_profile.positions_code
  );
  const [position, setPosition] = useState([]);
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
        console.log(response);
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
  const params = {
    params: {
      search_team_id: profile.command._id,
    },
  };
  const [token, setToken] = useState()
  function InviteToken() {
    axios({
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
    });
  }
  InviteToken();
  const shareData = {
    title: "YOUNITE",
    text: "Вас пригласили в команду!",
    url: `https://t.me/younitelmg_bot/younite?startapp=join_dota2_${token}`,
  };
  const handleShare = () => {
    navigator.share(shareData);
  };

  return (
    <div className="command">
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

            <input
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
              <img src={UserRank} alt="" className="teammateRankImg" />
            </div>
            <div className="teammateInfo">
              <div className="">
                <div className="teammateName">
                  {profile.command.owner_game_profile.name}{" "}
                  <img src={owner} alt="" />{" "}
                </div>
                <div className="redact">
                  <img src={trash} alt="" />
                </div>
              </div>
              <img src={line} className="teammatesHr" />
              <div className="teammeteHeroes">
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
          {profile.command.members_game_profiles.map((profile, id) => (
            <Member profile={profile} id={id} />
          ))}
          <div className="pagButtons">
            <img src={gosearch} className="pagButton" />
            <img
              src={sharebutton}
              className="pagButtonfind"
              onClick={handleShare}
            />
            <img src={add} className="pagButtonfind" />
            <img src={trash} className="trash" onClick={handleDelete} />
          </div>
        </div>
      )}
    </div>
  );
};

export default CommandFind;
