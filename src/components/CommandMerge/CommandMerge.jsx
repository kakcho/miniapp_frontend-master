import React, { useContext, useEffect, useState } from 'react'
import './CommandMerge.css'
import people from "../../assets/peopl.svg";
import age from "../../assets/Age.svg";
import add from '../../assets/addComand.svg'
import refresh from '../../assets/refresh.svg'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { ApiDataContext } from '../../context/ApiDataContext';
import { useSse } from '../hook/UseSse';
import { ranks } from '../../utils/Ranks';
import carry from "../../assets/karry.svg";
import mid from "../../assets/mid.svg";
import hard from "../../assets/hard.svg";
import semiSup from "../../assets/semiSupport.svg";
import support from "../../assets/support.svg";
import { heroes } from '../../utils/dotaHero';

const CommandMerge = () => {
  const { CommandMergeId } = useParams()
 const {closeSSE} = useSse()
  const location = useLocation()
  const dataCommand = location.state.data


  const data = useContext(ApiDataContext);
  const navigate = useNavigate()

  const decode = decode_positions(
    dataCommand.suggested_team.game_profiles.map((profile) => 
      profile.positions_code)
  );
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

  const [position, setPosition] = useState([]);
  const [heroesName, setHeroesName] = useState([])
  useEffect(()=>{
    const heroArray = dataCommand.suggested_team.game_profiles.map((profile)=>
      profile.heroes
    )
    
    for (let i = 0; i < heroArray.length; i++) {
      const element = heroArray[i];
      setHeroesName(heroesName.concat(element))
    }
  },[])
  const heroesUrl = findUserByName(heroes, heroesName)


  useEffect(()=>{
  if (dataCommand.remaining_time <= 1) {
    deny()
  }},[dataCommand.remaining_time]
)

function findUrlByName(profile, heroes) {
  for (var i = 0; i < profile.length; i++) {
    if (profile[i].name === heroes) {
      return profile[i].url;
    }
  }
}

  function findMaxRank() {

    if (dataCommand) {
      const maxRank = Math.max(
        ...dataCommand?.suggested_team.game_profiles.map((person) =>
          peopleRankToNumber(person.rank)
        )
      );
      return maxRank;
    }



  }

  // Функция для нахождения миниpeopleRankToNumber(pickedCommand?.owner_game_profile.rank)мального звания
  function findMinRank() {
    if (dataCommand) {
      const minRank = Math.min(
        ...dataCommand?.suggested_team.game_profiles.map((person) =>
          peopleRankToNumber(person.rank)
        )
      );
      return minRank;

    }
  }



  function peopleRankToNumber(rank) {
    if (rank === "Unranked") return 1;

    if (rank === "Herald_1") return 2;
    if (rank === "Herald_2") return 3;
    if (rank === "Herald_3") return 4;
    if (rank === "Herald_4") return 5;
    if (rank === "Herald_5") return 6;

    if (rank === "Guardian_1") return 7;
    if (rank === "Guardian_2") return 8;
    if (rank === "Guardian_3") return 9;
    if (rank === "Guardian_4") return 10;
    if (rank === "Guardian_5") return 11;

    if (rank === "Crusader_1") return 12;
    if (rank === "Crusader_2") return 13;
    if (rank === "Crusader_3") return 14;
    if (rank === "Crusader_4") return 15;
    if (rank === "Crusader_5") return 16;

    if (rank === "Archon_1") return 17;
    if (rank === "Archon_2") return 18;
    if (rank === "Archon_3") return 19;
    if (rank === "Archon_4") return 20;
    if (rank === "Archon_5") return 21;

    if (rank === "Legend_1") return 22;
    if (rank === "Legend_1") return 23;
    if (rank === "Legend_1") return 24;
    if (rank === "Legend_1") return 25;
    if (rank === "Legend_1") return 26;

    if (rank === "Ancient_1") return 27;
    if (rank === "Ancient_2") return 28;
    if (rank === "Ancient_3") return 29;
    if (rank === "Ancient_4") return 30;
    if (rank === "Ancient_5") return 31;

    if (rank === "Divine_1") return 32;
    if (rank === "Divine_2") return 33;
    if (rank === "Divine_3") return 34;
    if (rank === "Divine_4") return 35;
    if (rank === "Divine_5") return 36;

    if (rank === "Immortal") return 37;
  }


  function peopleNumberToRank(rank) {
    if (rank === 1) return "Unranked";

    if (rank === 2) return "Herald_1";
    if (rank === 3) return "Herald_2";
    if (rank === 4) return "Herald_3";
    if (rank === 5) return "Herald_4";
    if (rank === 6) return "Herald_5";

    if (rank === 7) return "Guardian_1";
    if (rank === 8) return "Guardian_2";
    if (rank === 9) return "Guardian_3";
    if (rank === 10) return "Guardian_4";
    if (rank === 11) return "Guardian_5";

    if (rank === 12) return "Crusader_1";
    if (rank === 13) return "Crusader_2";
    if (rank === 14) return "Crusader_3";
    if (rank === 15) return "Crusader_4";
    if (rank === 16) return "Crusader_5";

    if (rank === 17) return "Archon_1";
    if (rank === 18) return "Archon_2";
    if (rank === 19) return "Archon_3";
    if (rank === 20) return "Archon_4";
    if (rank === 21) return "Archon_5";

    if (rank === 22) return "Legend_1";
    if (rank === 23) return "Legend_2";
    if (rank === 24) return "Legend_3";
    if (rank === 25) return "Legend_4";
    if (rank === 26) return "Legend_5";

    if (rank === 27) return "Ancient_1";
    if (rank === 28) return "Ancient_2";
    if (rank === 29) return "Ancient_3";
    if (rank === 30) return "Ancient_4";
    if (rank === 31) return "Ancient_5";

    if (rank === 32) return "Divine_1";
    if (rank === 33) return "Divine_2";
    if (rank === 34) return "Divine_3";
    if (rank === 35) return "Divine_4";
    if (rank === 36) return "Divine_5";

    if (rank === 37) return "Immortal";
  }
function approve() {
  axios.post(`${import.meta.env.VITE_BASE_API_URL}/api/search_engine/approve`, null
        ,
        {
          headers: {
            Authorization: `Bearer ${data?.access}`,
          },
        })
}
function deny() {
  axios.post(`${import.meta.env.VITE_BASE_API_URL}/api/search_engine/deny`, null
        ,
        {
          headers: {
            Authorization: `Bearer ${data?.access}`,
          },
        })
        navigate(`/FindCommand/${CommandMergeId}`)
          

}
function decode_positions(code) {
  const positions = [];
  for (let j = 0; j < code.length; j++) {
    for (let i = 1; i <= 5; ++i) {
      if (code[j] & (1 << (i - 1))) {
        positions.push(i);
      }
    }
    
  }

  return positions;
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
}, []);

  const maxRankUrl = findUrlByName(ranks,peopleNumberToRank(findMaxRank()))
  const minRankUrl = findUrlByName(ranks, peopleNumberToRank(findMinRank()))

  return (
    <div className="FindCommandContainer">
      <h1 className="FindCommandH1">Команда найдена</h1>
      <p className="FindCommandName">{dataCommand?.suggested_team.name}</p>
      <div className="FindCommandContent">
        <div className="FindCommandBlock">
          <img src={people} className="FindCommandPeople" />-
          {dataCommand.suggested_team.game_profiles.length}
        </div>
        <div className="FindCommandBlockAge">
          <img src={age} className="FindCommandPeople" />-{" "}
          5
        </div>
        <div className="FindCommandBlockRang">
          {minRankUrl == maxRankUrl ? (
            <img src={maxRankUrl} className="FindCommandBlockRangImg" />
          ) : (
            <>
              <img src={minRankUrl} className="FindCommandBlockRangImg" /> -{" "}
              <img src={maxRankUrl}  className="FindCommandBlockRangImg" />
            </>
          )}
        </div>
        <div className="CommandMergeHeroes">
        <div className="CommandMergePositionsContainer">
          {heroesUrl.map((url)=>
            <img src={url} className='CommandMergePosition'/>
        )}</div>
        </div>
        <div className="CommandMergePositions">
          <div className="CommandMergePositionsContainer">
          {position.map((url)=>
            <img src={url} className='CommandMergePosition'/>
        )}</div>
          </div>
        <div className="FindContentImg" />
      </div>
      <div className="CommandMergeDescriptionTitle">Описание:</div>
      <textarea disabled className="CommandMergeDescription" value={'Играю на саппорте fdghiojludfhgiobpfdjlhgfdksnbhjdfgljghlfdjhglkjjdfljkhgl;sdfhgljkdfkljghfl jkdhgjnlkgdfjljkglkfjglijfdligjdflkgjlkifdjgklidfjklgjdfkljgkfdgklj  gkfjgfdkjgklfdj g'}>

      </textarea>
      <div className="CommandMergeButtons">

          <div className="CommandMergeButton">        <img src={refresh} onClick={deny} className='CommandMergeButtonAdd' /> Следующий</div>
          <div className="CommandMergeButton" >Принять <img src={add} onClick={approve} className='CommandMergeButtonAdd'/></div>
      </div>
      <div className="CommandMergeTime">{dataCommand.remaining_time}</div>
    </div>
  )
}

export default CommandMerge