import axios from "axios"
import { useContext, useEffect, useState } from "react";
import { ApiDataContext } from "../../context/ApiDataContext";
import { redirect, useNavigate } from "react-router-dom";

export function handleUrlParams() {
    let navigate = useNavigate()
    const data = useContext(ApiDataContext);
    const [gameProfiles, setGameProfiles] = useState()
    useEffect(() => {
        if (data) {
          axios
            .request({
              headers: {
                Authorization: `Bearer ${data?.access}`,
              },
              method: "GET",
              url: `${import.meta.env.VITE_BASE_API_URL}/api/game_profiles/all`,
            })
            .then((response) => {
              setGameProfiles(response.data.response)
            });
        }
      }, [data]);
    if (location.search && gameProfiles) {
        const token = location.search.split("_").at(-1 )
    axios.post(`${import.meta.env.VITE_BASE_API_URL}/api/search_teams/join`,{
        invite_token: token,
        game_profile_id: gameProfiles[0]._id
    },{
        headers: {
            Authorization: `Bearer ${data.access}`
          }
    }).then((res)=>{
        navigate("/Find")
    })

}
  }
