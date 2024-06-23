import { useContext, useEffect, useState } from "react";
import { ApiDataContext } from "../../context/ApiDataContext";
import { EventSource } from "extended-eventsource";

export const useSse = (searchID) => {
  const data = useContext(ApiDataContext);
  const [message, setMessage] = useState(null);
  const [sseConnection, setSSEConnection] = useState();
  
	function start_search(stop) {
    if (data) {
      const event_sourse = new EventSource(
        `${
          import.meta.env.VITE_BASE_API_URL
        }/api/search_engine/search_stream?search_team_id=${searchID}`,
        {
          headers: {
            Authorization: `Bearer + ${data?.access}`,
          },
        })
        setSSEConnection(event_sourse)
    }
  }
    
  const closeSSE = () => {
    if (sseConnection) {
      sseConnection.close();
      setSSEConnection(null);
      console.log(sseConnection)
    }
  };

    
	

  return {start_search, closeSSE};
};


