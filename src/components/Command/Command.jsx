import React, { useContext, useEffect, useState } from 'react'
import './Command.css'
import Header from '../Header/Header'
import Bar from '../Bar/Bar'
import { Modal } from '../Find/Modal'
import CommandFind from '../Find/CommandFind' 

import add from '../../assets/add.svg'
import CommandItem from './CommandItem'
import { ApiDataContext } from '../../context/ApiDataContext'
import axios from 'axios'
import UserModal from './UserModal'




const Command = () => {
  const [openModal, setOpenModal] = useState(false)
  const data = useContext(ApiDataContext);
  const [command, setCommand] = useState()


  useEffect(() => {
    if (data) {
      axios
        .request({
          headers: {
            Authorization: `Bearer ${data?.access}`
          },
          method: "GET",
          url: `${import.meta.env.VITE_BASE_API_URL}/api/final_teams/all`,
        })
        .then((response) => {
          setCommand(response.data);
        });
    }
  }, [data, openModal]);

    console.log(command)

  function handleClick(event) {
      setOpenModal(false)
  }

 if(command){ return (
    <div className='findContainer'  >

      <div onClick={()=>{setOpenModal(false)}}>
      <Header title={'Поиск'}/>


     {confirm ? <>
           <div className="sup Finder">Ваши команды</div>
           <div className="containerCommandBLock" >
      {command.response.map((profile)=>(
        <CommandItem command={profile}/>
      ))}
</div></> : <div className="commandError">У вас нет активных команд</div>}

</div>

        
      <Bar/>
    </div>
  )}
}

export default Command