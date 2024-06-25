import { useContext, useEffect, useState } from "react";
import { ApiDataContext } from "../../context/ApiDataContext";
import { EventSource } from "extended-eventsource";
import { useNavigate } from "react-router-dom";


export const useSse = (searchID) => {
  const data = useContext(ApiDataContext);
  const [events, setEvents] = useState([]); // Массив для хранения полученных событий
  const [sseConnection, setSSEConnection] = useState();
  const [confirm, setConfirm] = useState(false)
  const navigate = useNavigate();

  function start_search() {
    if (data && !confirm) {
      const event_sourse = new EventSource(
        `${
          import.meta.env.VITE_BASE_API_URL
        }/api/search_engine/search_stream?search_team_id=${searchID}`,
        {
          headers: {
            Authorization: `Bearer + ${data.access}`,
          },
        }
      )
      event_sourse.addEventListener('serach', (event)=>{
       setConfirm(false)

      })
      event_sourse.addEventListener('confirmation', (event)=>{
        const data = JSON.parse(event.data)
        if (!confirm) {
          navigate(`/commandMerge/${searchID}`, { state: { data: data } })
        }

       setConfirm(true)

      })
      event_sourse.addEventListener('merged', ()=>{
        navigate(`/command`)
        event_sourse.close();

      })
      setSSEConnection(event_sourse);
    }
  }

  const closeSSE = () => {
    if (sseConnection) {
      sseConnection.close();
      setSSEConnection(null);
      console.log(sseConnection);
    }
  };

  

  return { start_search, closeSSE, confirm};
}
