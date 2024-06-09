import React, { useState } from "react";
import "./Bar.css";
import Find from "../../assets/Find.svg";
import FindHover from "../../assets/FindHover.svg";
import Profile from "../../assets/Profile.svg";
import ProfileHover from "../../assets/ProfileHover.svg";
import Tutor from "../../assets/Tutor.svg";
import TutorHover from "../../assets/TutorHover.svg";
import { NavLink } from "react-router-dom";

const Bar = () => {
  return (
    <div className="bar-container">
      <div className="bar">
        <NavLink to="/Profile">
          {({ isActive }) => (
            <img
              src={isActive ? ProfileHover : Profile}
              className="bar-icon Profile"
            />
          )}
        </NavLink>

        <NavLink to="/Find">
          {({ isActive }) => (
            <img src={isActive ? FindHover : Find} className="bar-icon Find" />
          )}
        </NavLink>
        <NavLink to="/">
          {({ isActive }) => (
            <img
              src={isActive ? TutorHover : Tutor}
              className="bar-icon Tutor"
            />
          )}
        </NavLink>
      </div>
    </div>
  );
};

export default Bar;
