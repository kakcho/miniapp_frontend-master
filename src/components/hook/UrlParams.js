import axios from "axios"
import { useContext, useEffect, useState } from "react";
import { ApiDataContext } from "../../context/ApiDataContext";
import { redirect, useNavigate } from "react-router-dom";

export function handleUrlParams() {

    let navigate = useNavigate()


    if (location.search) {
      const token = location.search.split("_").at(-1 )
        navigate("/Find", { state: { search: true, token : token} })
}
  }
