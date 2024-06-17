import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { ApiDataContext } from './ApiDataContext';



const ApiDataProvider = ({children}) => {
        const [data, setData] = useState(null);
        const testInit = 'TGMA user=%7B%22id%22%3A1022917596%2C%22first_name%22%3A%22Andrew%22%2C%22last_name%22%3A%22C%22%2C%22username%22%3A%22AndrewE01%22%2C%22language_code%22%3A%22en%22%2C%22allows_write_to_pm%22%3Atrue%7D&chat_instance=-2479719773736095853&chat_type=sender&auth_date=1717748777&hash=f5062cdf16251c020b0628a5e54b13ab96a70ba66da0623c32ef6532c722176c'
        let config = {
        headers: {
            Authorization:  testInit
        }}
        useEffect(() => {
          const apiUrl = (`${import.meta.env.VITE_BASE_API_URL}/api/auth/jwt_by_init_data/`);

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