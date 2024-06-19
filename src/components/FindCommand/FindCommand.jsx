import React from "react";
import './FindCommand.css'
import FindContent from '../../assets/FindContent.png'
import people from "../../assets/peopl.svg";
import age from '../../assets/Age.svg'

const FindCommand = ({profile}) => {
  return (
    <div className="FindCommandContainer">
      <h1 className="FindCommandH1">Поиск</h1>
      <p className="FindCommandName">Elan</p>
      <div className="FindCommandContent">
      <div className="FindCommandBlock"><img src={people}  className="FindCommandPeople"/>- 2</div>
      <div className="FindCommandBlockAge"><img src={age} className="FindCommandPeople"/>- 18</div>
      <div className="FindCommandBlockRang"></div>
      <img src={FindContent} className="FindContentImg" />
      </div>
    </div>
  );
};

export default FindCommand;
