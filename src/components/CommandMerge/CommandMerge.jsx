import React, { useContext, useEffect } from 'react'
import './CommandMerge.css'
import people from "../../assets/peopl.svg";
import age from "../../assets/Age.svg";
import add from '../../assets/addComand.svg'
import refresh from '../../assets/refresh.svg'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { ApiDataContext } from '../../context/ApiDataContext';
import { useSse } from '../hook/UseSse';

const CommandMerge = () => {
  const { searchID } = useParams()
  const {closeSSE} = useSse()
  const location = useLocation()
  const dataCommand = location.state.data
  const data = useContext(ApiDataContext);
  const navigate = useNavigate()
  console.log(dataCommand)
  useEffect(()=>{
  if (dataCommand.remaining_time <= 1) {
    deny()
  }},[dataCommand.remaining_time]
)
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
        }).then(()=>{
          closeSSE()
          navigate(`/Find`)
        })

}
  return (
    <div className="FindCommandContainer">
      <h1 className="FindCommandH1">Команда найдена</h1>
      <p className="FindCommandName">{dataCommand?.suggested_team.name}</p>
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
      <textarea disabled className="CommandMergeDescription">
          Играю на саппорте fdghiojlu'dfhgiobpfdjlhgfdksnbhjdfgljghlfdjhglkjjdfljkhgl;sdfhgljkdfkljghfl jkdhgjnlkgdfjljkglkfjglijfdligjdflkgjlkifdjgklidfjklgjdfkljgkfdgklj  gkfjgfdkjgklfdj gdfhgdf hdgfhfgh gdf
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