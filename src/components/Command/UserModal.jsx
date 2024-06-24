import React, { useState } from "react";
import x from '../../assets/X.svg'
import discord from '../../assets/discord.svg'
import steam from '../../assets/steam.svg'
import copy from '../../assets/Copy.svg'


const UserModal = ({setOpenModal, profile}) => {
  const [steamValue, setSteamValue] = useState('232')
  const [discordValue, setDiscrodValue] = useState('2312432')
  const handleCopySteam = () => {
    navigator.clipboard.writeText(steamValue);
}  
const handleCopyDiscord = () => {
  navigator.clipboard.writeText(steamValue);
}  
  return (
    <div className="UserModal">
      <div className="userModalContent">
      <div className="blackClose">
          <img
            src={x}
            alt=""
            onClick={() => {
              setOpenModal(false);
            }}
          />
        </div>
        <h3 className="userModalContentTitle">Name</h3>
        {profile.description && <div className="userModalDescription">
            <p className="userModalDescriptionP">{profile.description}</p>
            
        </div>}
        <div className="userModalInfoContainer">
        <div className="userModalInfo">
            <img src={discord} className="userModalIcon" />
            <div className="userModalInfoP" >{steamValue}</div>
            <a className="userModalInfoCopy"><img src={copy} onClick={handleCopySteam}   className="userModalInfoCopy"/></a>
            </div>
            <div className="userModalInfo">
            <img src={steam} className="userModalIcon" />
            <p className="userModalInfoP" >{discordValue}</p>
            <a className="userModalInfoCopy"><img src={copy}  className="userModalInfoCopy"onClick={handleCopyDiscord} /></a> 
            </div>
      </div>
      </div>
    </div>
  );
};

export default UserModal;
