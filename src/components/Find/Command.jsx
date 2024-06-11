import React, { useState } from "react";
import "./Find.css";
import owner from "../../assets/owner.svg";
import people from "../../assets/peopl.svg";
import pag from "../../assets/pag.svg";
import pen from '../../assets/RulerPen.svg'
import rang from '../../utils/iconsRank/SeasonalRank0-0.webp'
import trash from '../../assets/TrashBinTrash.svg'
import line from '../../assets/Line.svg'
import linetop from '../../assets/Linetop.svg'


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
                  <img src={rang} className="teammeteHeroe"/>
                  <img src={rang} className="teammeteHeroe"/>
                  <img src={rang} className="teammeteHeroe"/>
                  <img src={rang} className="teammeteHeroe"/>
                  <img src={linetop} alt="" />
                </div>
          </div>

        </div>
    </div>}
    </div>

  );
};

export default Command;
