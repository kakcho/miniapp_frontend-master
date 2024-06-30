import { useContext, useEffect, useState } from "react";
import { ApiDataContext, TransparencyContext, } from "../../context/ApiDataContext";
import { EventSource } from "extended-eventsource";
import { useLocation, useNavigate } from "react-router-dom";


export const useSse = (searchID) => {
  const {event, setEvent} = useContext(TransparencyContext)

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
      event_sourse.addEventListener('search', (event)=>{
       setConfirm(false)
       navigate(`/FindCommand/${searchID}`)
      })
      event_sourse.addEventListener('confirmation', (event)=>{
        const data = JSON.parse(event.data)
        if (!confirm) {
          navigate(`/commandMerge/${searchID}`, { state: { data: data} })
        }

      })
      event_sourse.addEventListener('merged', ()=>{
        navigate(`/command`)
        event_sourse.close();
        setConfirm(true)
      })
      event_sourse.addEventListener("error", () => {
        navigate(`/Find`)
      });
      setEvent(event_sourse);

    }


  }

  const closeSSE = () => {

      event?.close();
      setEvent(null);

  };

  

  return { start_search, closeSSE, confirm};
}
