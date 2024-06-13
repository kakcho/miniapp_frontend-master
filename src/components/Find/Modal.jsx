import React from 'react'
import dwn from '../../assets/Arrowdwn.svg'

export const Modal = ({setOpenModal}) => {
  
  return (
    <div className='modal'>
        <div className="blur">
          <input type="text" placeholder='Назовите команду' className='nickname-modal'/>
          <input type="text"  name='chooseProfile' className='modal-chooseProfile'/>
          <label htmlFor="chooseProfile" className='modal-chooseProfileLable'>Выберите игровой профиль</label>
          <img src={dwn} className='dwn'/>
          <button className='modal-button' onClick={setOpenModal}>Создать команду</button>
        </div>
    </div>
  )
}
