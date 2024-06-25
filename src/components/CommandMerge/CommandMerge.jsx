import React from 'react'
import './CommandMerge.css'
import people from "../../assets/peopl.svg";
import age from "../../assets/Age.svg";
import add from '../../assets/addComand.svg'
import refresh from '../../assets/refresh.svg'
import { useLocation } from 'react-router-dom';

const CommandMerge = () => {
  const location = useLocation()
  const data = location.state.data


   
  function findMaxRank() {

    if (pickedCommand) {
      const maxRank = Math.max(
        ...pickedCommand?.members_game_profiles.map((person) =>
          peopleRankToNumber(person.rank)
        )
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


  return (
    <div className="FindCommandContainer">
      <h1 className="FindCommandH1">Команда найдена</h1>
      <p className="FindCommandName">{data?.suggested_team.name}</p>
      <div className="FindCommandContent">
        <div className="FindCommandBlock">
          <img src={people} className="FindCommandPeople" />-
          7
        </div>
        <div className="FindCommandBlockAge">
          <img src={age} className="FindCommandPeople" />-{" "}
          5
        </div>
        <div className="FindCommandBlockRang">
          {true ? (
            <img  className="FindCommandBlockRangImg" />
          ) : (
            <>
              <img  className="FindCommandBlockRangImg" /> -{" "}
              <img  className="FindCommandBlockRangImg" />
            </>
          )}
        </div>
        <div className="CommandMergeHeroes">

        </div>
        <div className="CommandMergePosition">
          
          </div>
        <div className="FindContentImg" />
      </div>
      <div className="CommandMergeDescriptionTitle">Описание:</div>
      <div className="CommandMergeDescription">
          Играю на саппорте fdghiojlu'dfhgiobpfdjlhgfdksnbhjdfgljghlfdjhglkjjdfljkhgl;sdfhgljkdfkljghfl jkdhgjnlkgdfjljkglkfjglijfdligjdflkgjlkifdjgklidfjklgjdfkljgkfdgklj  gkfjgfdkjgklfdj gdfhgdf hdgfhfgh gdf
      </div>
      <div className="CommandMergeButtons">

          <div className="CommandMergeButton">        <img src={refresh} className='CommandMergeButtonAdd' /> Следующий</div>
          <div className="CommandMergeButton">Принять <img src={add}  className='CommandMergeButtonAdd'/></div>
      </div>
      <div className="CommandMergeTime">{data.remaining_time}</div>
    </div>
  )
}

export default CommandMerge