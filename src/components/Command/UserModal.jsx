import React, { useState } from "react";
import x from '../../assets/X.svg'
import discord from '../../assets/discord.svg'
import steam from '../../assets/steam.svg'
import copy from '../../assets/Copy.svg'


const UserModal = ({setOpenModal, profile}) => {
  console.log(profile)
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
            <p className="userModalInfoP">1215154153</p>
            <img src={copy}  className="userModalInfoCopy"/>
            </div>
            <div className="userModalInfo">
            <img src={steam} className="userModalIcon" />
            <p className="userModalInfoP">1215154153</p>
            <img src={copy}  className="userModalInfoCopy"/>
            </div>
      </div>
      </div>
    </div>
  );
};

export default UserModal;
