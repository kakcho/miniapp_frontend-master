import React, { useContext, useEffect, useState } from "react";
import "./FindCommand.css";
import FindContent from "../../assets/FindCommand.svg";
import people from "../../assets/peopl.svg";
import age from "../../assets/Age.svg";
import { useParams } from "react-router-dom";
import { ApiDataContext } from "../../context/ApiDataContext";
import axios from "axios";
import { ranks } from "../../utils/Ranks";
import {useSse} from "../hook/UseSse";

const FindCommand = () => {
  const { CommandId } = useParams();
  const data = useContext(ApiDataContext);
  const [command, setCommand] = useState();
  const [info, setInfo] = useState();

  const {start_search, closeSSE} = useSse(CommandId)


  
  useEffect(()=>{
    start_search()
  },[data])
  useEffect(() => {
    setTimeout(() => {
      axios
      .get(`${import.meta.env.VITE_BASE_API_URL}/api/search_engine/team_info`, {
        headers: {
          Authorization: `Bearer ${data?.access}`,
        },
      })
      .then((res) => setInfo(res.data.response));
    }, 1000);
   
  }, [data]);

  useEffect(() => {
    if (data) {
      axios
        .request({
          headers: {
            Authorization: `Bearer ${data?.access}`,
            "Content-Type": "application/json",
          },
          method: "GET",
          url: `${import.meta.env.VITE_BASE_API_URL}/api/search_teams/all`,
        })
        .then((response) => {
          setCommand(response.data.response);
        });
    }
  }, [data]);
  function findCommandByid(commands, id) {
    for (var i = 0; i < commands?.length; i++) {
      if (commands[i]._id == id) {
        return commands[i];
      }
    }
  }
  const id = CommandId;

  const pickedCommand = findCommandByid(command, CommandId);
 
  function calculateAverageAge(array1, owner) {
    // Суммируем все возраста из обоих массивов
    let totalAges = 0;
    array1.forEach((item) => (totalAges += item.age));
    totalAges += owner.age;

    // Вычисляем общий размер выборки (количество элементов в обоих массивах)
    const totalCount = array1.length + 1;

    // Вычисляем средний возраст
    const averageAge = totalAges / totalCount;

    return averageAge;
  }
  
  function findMaxRank() {

    if (pickedCommand) {
      const maxRank = Math.max(
        ...pickedCommand?.members_game_profiles.map((person) =>
          peopleRankToNumber(person.rank)
        ),
        peopleRankToNumber(pickedCommand?.owner_game_profile.rank)
      );
      if (maxRank == 0) {
        return peopleRankToNumber(pickedCommand?.owner_game_profile.rank);}
      return maxRank;
    }



  }

  // Функция для нахождения миниpeopleRankToNumber(pickedCommand?.owner_game_profile.rank)мального звания
  function findMinRank() {
    if (pickedCommand) {
      const minRank = Math.min(
        ...pickedCommand?.members_game_profiles.map((person) =>
          peopleRankToNumber(person.rank)
        ),
        peopleRankToNumber(pickedCommand?.owner_game_profile.rank)
      );
            if (minRank == 0) {
        return peopleRankToNumber(pickedCommand?.owner_game_profile.rank);}
      return minRank;

    }

    


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

  function findUrlByName(profile, heroes) {
    for (var i = 0; i < profile.length; i++) {
      if (profile[i].name === heroes) {
        return profile[i].url;
      }
    }
  }
  const minRank = peopleNumberToRank(findMinRank());
  const maxRank = peopleNumberToRank(findMaxRank());
  const minRankUrl = findUrlByName(ranks, minRank);
  const maxRankUrl = findUrlByName(ranks, maxRank);

  return (
    <div className="FindCommandContainer">
      <h1 className="FindCommandH1">Поиск</h1>
      <p className="FindCommandName">{pickedCommand?.name}</p>
      <div className="FindCommandContent">
        <div className="FindCommandBlock">
          <img src={people} className="FindCommandPeople" />-
          {pickedCommand?.members_game_profiles.length + 1}
        </div>
        <div className="FindCommandBlockAge">
          <img src={age} className="FindCommandPeople" />-{" "}
          {info?.average_age ? info.average_age : "?"}
        </div>
        <div className="FindCommandBlockRang">
          {minRankUrl == maxRankUrl ? (
            <img src={maxRankUrl} className="FindCommandBlockRangImg" />
          ) : (
            <>
              <img src={minRankUrl} className="FindCommandBlockRangImg" /> -{" "}
              <img src={maxRankUrl} className="FindCommandBlockRangImg" />
            </>
          )}
        </div>
        <div className="FindContentImg" />
      </div>
      <div className="FindCancel" onClick={closeSSE}>
        <a href="/Find" className="aFind">
          {" "}
          Отмена
        </a>
      </div>
    </div>
  );
};

export default FindCommand;
