import React, { useState } from "react";
import "./Find.css";
import owner from "../../assets/owner.svg";
import people from "../../assets/peopl.svg";
import pag from "../../assets/pag.svg";
import pen from '../../assets/RulerPen.svg'

import trash from '../../assets/TrashBinTrash.svg'
import line from '../../assets/Line.svg'
import linetop from '../../assets/Linetop.svg'
import gosearch from '../../assets/gosearch.svg'
import add from '../../assets/add.svg'
import sharebutton from '../../assets/sharebutton.svg'


const Command = ({ commandName, commandOwner, playersCount, teammates }) => {
  const [open, setOpen] = useState(false)
  function handleOpen() {
    setOpen(!open)
  }

  return (
    <div className="command">
    <div className="command-container">
      <div className="nicknameCommand">
        {commandName} {commandOwner && <img src={owner} />}{" "}
      </div>
      <div className="imagesPag">
        <div className="numberPlayer">3</div>
        <img src={people} alt="" className="people" />
        <img src={pag} className="pag" onClick={handleOpen}/>
      </div>
    </div>
{ open &&   <div className="pagConteiner">
      <div className="description">
        <div className="descriptionTitle">
          Описание 
          <img src={pen} alt="" />
        </div>
      </div>
      <div className="teammates">
          <div className="teammateRank">
          <img src={rang} alt="" className="teammateRankImg"/>
          </div>
          <div className="teammateInfo">
            <div className="">
                <div className="teammateName">Name <img src={owner} alt="" />                 </div>
                <div className="redact"><img src={trash} alt="" /></div>
                </div>
                <img src={line} className="teammatesHr"/>
                <div className="teammeteHeroes">

                  <img src={linetop} alt="" />
                </div>
          </div>

      </div>
      <div className="pagButtons">
          <img src={gosearch} className="pagButton"  />
          <img src={sharebutton} className="pagButton" />
          <img src={add}  className="pagButton" />
          <img src={trash} className="trash"/>
      </div>
    </div>}
    </div>

  );
};

export default Command;
