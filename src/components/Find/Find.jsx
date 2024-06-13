import React, { useState } from 'react'
import Bar from '../Bar/Bar'
import Header from '../Header/Header'
import './Find.css'
import Command from './Command'
import add from '../../assets/add.svg'
import { Modal } from './Modal'

const Find = () => {
  const [openModal, setOpenModal] = useState(false)

  function handleClick() {
    setOpenModal(!openModal)
  }
  return (
    <div className='findContainer'>
      <Header title={'Поиск'}/>
      <div className="sup Finder">Ваши команды</div>
        <Command commandName={'ELan'}/>

        <img src={add} className='addComandIcon' onClick={handleClick}/>
        {openModal && <Modal setOpenModal={handleClick}/>}
        
      <Bar/>
    </div>
  )
}

export default Find