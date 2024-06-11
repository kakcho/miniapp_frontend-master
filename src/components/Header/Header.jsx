import React from 'react'
import popup from '../../assets/popup.svg'
import notify from '../../assets/Notify.svg'
import './Header.css'

const Header = ({title}) => {
  return (
    <div className='header'>
        <img src={notify} alt=""  className='notify'/>
    <div className='title'>{title}</div>
    <a href="/"><img src={popup} alt="" className='popupIcon'/></a>
    </div>
  )
}

export default Header