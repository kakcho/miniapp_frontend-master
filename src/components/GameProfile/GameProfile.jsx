import React from "react";
import "./GameProfiles.css";

const GameProfile = ({ gameProfileName }) => {
  return (
    <div className="GameProfiles">
      <div className="gameProfilesName-heder">
      <h2 className="gameProfileName">{gameProfileName}</h2>
      </div>
    </div>
  );
};

export default GameProfile;
