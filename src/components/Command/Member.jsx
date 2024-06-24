import React, { useContext, useEffect, useMemo, useState } from "react";
import trash from "../../assets/TrashBinTrash.svg";
import line from "../../assets/Line.svg";
import linetop from "../../assets/Linetop.svg";
import carry from "../../assets/karry.svg";
import mid from "../../assets/mid.svg";
import hard from "../../assets/hard.svg";
import semiSup from "../../assets/semiSupport.svg";
import support from "../../assets/support.svg";
import { heroes } from "../../utils/dotaHero";
import { ApiDataContext } from "../../context/ApiDataContext";
import pen from "../../assets/RulerPen.svg";
import axios from "axios";
import { ranks } from "../../utils/Ranks";
import { ChangeModal } from "../Find/ChangeModal";
import UserModal from "./UserModal";

const Member = ({ profile, id, setOpenModal, find }) => {
  const data = useContext(ApiDataContext);
  const decode = decode_positions(profile.positions_code);
  const [position, setPosition] = useState([]);

  function findUrlByName(users, heroes) {
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
  function decode_positions(code) {
    const positions = [];
    for (let i = 1; i <= 5; ++i) {
      if (code & (1 << (i - 1))) {
        positions.push(i);
      }
    }
    return positions;
  }

  const heroesUrl = findUrlByName(heroes, profile.heroes);

  useMemo(() => {
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
    console.log(position)
  }, [data]);

  function handleRemove() {
    if (data) {
      axios
        .post(
          `${
            import.meta.env.VITE_BASE_API_URL
          }/api/search_teams/${id}/remove_member`,
          {
            game_profile_id: profile._id,
          },
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

  function findUserByName(ranks, rank) {
    for (var i = 0; i < ranks.length; i++) {
      if (ranks[i].name === rank) {
        return ranks[i].url;
      }
    }
  }

  const rankUrl = findUserByName(ranks, profile.rank);

  const [openModalInfo, setOpenModalInfo] = useState(false);
  return (
    true &&  ( <div className="teammates">
      {openModalInfo && !find && (
        <UserModal profile={profile} setOpenModal={setOpenModalInfo} />
      )}
      <div className="teammateRank">
        <img
          src={rankUrl}
          className="teammateRankImg"
          onClick={() => {
            setOpenModalInfo(true);
          }}
        />
      </div>
      <div className="teammateInfo">
        <div className="">
          <div
            className="teammateName"
            onClick={() => {
              setOpenModalInfo(true);
            }}
          >
            {profile.name}{" "}
          </div>
          <div className="redact">
            {profile.is_you ? (
              <img src={pen} onClick={() => setOpenModal(true)} />
            ) : (
              <img src={trash} onClick={handleRemove} />
            )}
          </div>
        </div>
        {<img src={line} className="teammatesHr" />}
        <div className="teammeteHeroes" onClick={() => setOpenModalInfo(true)}>
          {heroesUrl.map((url) => (
            <img src={url} className="teammeteHeroe" />
          ))}
          {heroesUrl[0] && <img src={linetop} alt="" />}
          {position.map((url) => (
            <img src={url} className="teammeteHeroe" />
          ))}
        </div>
      </div>
    </div>)
  );
};

export default Member;
