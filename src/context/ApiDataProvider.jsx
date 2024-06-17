import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { ApiDataContext } from './ApiDataContext';



const ApiDataProvider = ({children}) => {
        const [data, setData] = useState(null);
        const testInit = 'TGMA user=%7B%22id%22%3A869219969%2C%22first_name%22%3A%22%F0%9F%A7%9D%E2%80%8D%E2%99%82%EF%B8%8F%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22daaya1%22%2C%22language_code%22%3A%22ru%22%2C%22allows_write_to_pm%22%3Atrue%7D&chat_instance=-8318441471056915332&chat_type=sender&auth_date=1718628585&hash=a99c4ec339efe1d1e5d8c7a0a538a2a5360b60b90bfc81fb67eff4d28bfad62d'
        let config = {
        headers: {
            authorization:  window.Telegram.WebApp.initData 
        }}
        useEffect(() => {
          const apiUrl = (`${import.meta.env.VITE_BASE_API_URL}/api/auth/jwt_by_init_data`);

          axios.get(apiUrl, config)
          .then((resp) => {setData(resp.data.response)});
  
        }, [setData]);
      
        return (
          <ApiDataContext.Provider value={data}>
            {children}
          </ApiDataContext.Provider>
        );
      
}

export default ApiDataProvider 