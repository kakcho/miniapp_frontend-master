import { useContext, useEffect, useState } from "react";

import { fetchEventSource } from "@microsoft/fetch-event-source";

import { ApiDataContext } from "../../context/ApiDataContext";
import { EventSource } from "extended-eventsource";

const useSse = (searchID) => {

  const controller = new AbortController();

  const data = useContext(ApiDataContext);
  const [message, setMessage] = useState(null);

  const event_sourse = new EventSource(
    `${
      import.meta.env.VITE_BASE_API_URL
    }/api/search_engine/search_stream?search_team_id=${18}`,
    {
      headers: {
        Authorization: `Bearer + ${data?.access}`,
      },
    }
  );
  event_sourse.onmessage = function (event) {
    console.log("Новое сообщение", event.data);
    // этот код выведет в консоль 3 сообщения, из потока данных выше
  };

  return message;
};

export default useSse;
