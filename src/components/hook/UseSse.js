import { useContext, useEffect, useState } from "react";

import { fetchEventSource } from "@microsoft/fetch-event-source";

import { ApiDataContext } from "../../context/ApiDataContext";
import { EventSource } from "extended-eventsource";

const useSse = (searchID) => {
  const data = useContext(ApiDataContext);
  const [message, setMessage] = useState(null);
  
	useEffect(()=>{

    const event_sourse = new EventSource(
      `${
        import.meta.env.VITE_BASE_API_URL
      }/api/search_engine/search_stream?search_team_id=${searchID}`,
      {
        headers: {
          Authorization: `Bearer + ${data?.access}`,
        },
      }
    )},[data]
  )
  function stop_search() {
    EventSource.close()
  }

    
	

  return;
};

export default useSse;
