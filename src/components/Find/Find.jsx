import React, { useContext, useEffect, useState } from 'react'
import Bar from '../Bar/Bar'
import Header from '../Header/Header'
import './Find.css'
import CommandFind from './CommandFind'
import add from '../../assets/add.svg'
import { Modal } from './Modal'
import { ApiDataContext } from '../../context/ApiDataContext'
import axios from 'axios'
import UserModal from '../Command/UserModal'
import  {ChangeModal} from './ChangeModal'


const Find = () => {
  const [openModal, setOpenModal] = useState(false)
  const data = useContext(ApiDataContext);
  const [command, setCommand] = useState()
  const [profiles, setProfiles] = useState()

  useEffect(() => {
    if (data) {
      axios
        .request({
          headers: {
            Authorization: `Bearer ${data?.access}`,
            'Content-Type':  'application/json',
          },
          method: "GET",
          url: `${import.meta.env.VITE_BASE_API_URL}/api/search_teams/all`,
        })
        .then((response) => {
          console.log(response)
          setCommand(response.data);
        });
    }
  }, [data]);

  useEffect(() => {
    if (data) {
      axios
        .request({
          headers: {
            Authorization: `Bearer ${data?.access}`,
            'Content-Type':  'application/json',
          },
          method: "GET",
          url: `${import.meta.env.VITE_BASE_API_URL}/api/game_profiles/all`,
        })
        .then((response) => {
          setProfiles(response.data);
        });
    }
  }, [data]);

  function handleClick() {
    setOpenModal(!openModal)
  }

  return (
    <div className='findContainer'>

      <Header title={'Поиск'}/>
      <div className="sup Finder">Ваши команды</div>
      <div className="containerCommandBLock" >
      {command?.response.map((profile)=>(
        <CommandFind command={profile}/>
      ))}
</div>

        <img src={add} className='addComandIcon' onClick={handleClick}/>
        {openModal && <Modal setOpenModal={handleClick} create={profiles?.response}/>}
        
      <Bar/>
    </div>
  )
}

export default Find