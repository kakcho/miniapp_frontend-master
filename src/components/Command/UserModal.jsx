import React, { useState } from "react";
import x from '../../assets/X.svg'
import discord from '../../assets/discord.svg'
import steam from '../../assets/steam.svg'
import copy from '../../assets/Copy.svg'


const UserModal = ({setOpenModal, profile}) => {
  console.log(profile)
  const [steamValue, setSteamValue] = useState(profile.contact_data.steam_id)
  const [discordValue, setDiscrodValue] = useState(profile.contact_data.discord_nickname)
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
        <h3 className="userModalContentTitle">{profile.name}</h3>
        {profile.contact_data.bio && <div className="userModalDescription">
            <p className="userModalDescriptionP">{profile.contact_data.bio}</p>
            
        </div>}
        <div className="userModalInfoContainer">
        <div className="userModalInfo">
            <img src={discord} className="userModalIcon" />
            <div className="userModalInfoP" >{discordValue}</div>
            <a className="userModalInfoCopy"><img src={copy} onClick={handleCopySteam}   className="userModalInfoCopy"/></a>
            </div>
            <div className="userModalInfo">
            <img src={steam} className="userModalIcon" />
            <p className="userModalInfoP" >{steamValue}</p>
            <a className="userModalInfoCopy"><img src={copy}  className="userModalInfoCopy"onClick={handleCopyDiscord} /></a> 
            </div>
      </div>
      </div>
    </div>
  );
};

export default UserModal;
