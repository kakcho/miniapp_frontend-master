import React, { useState } from 'react'
import popup from '../../assets/popup.svg'
import notify from '../../assets/Notify.svg'
import './Header.css'
import x from '../../assets/X.svg'

const Header = ({title}) => {
  const [open, setOpen] = useState(false)
  return (
    <div className='header'>
        <a href="/tutor" className='a'><img src={notify} alt=""  className='notify'/></a>
    <div className='title'>{title}</div>
    <a href="/" className='a'><img src={popup} alt="" className='popupIcon' onClick={()=>{setOpen(!open)}}/></a>
    </div>
  )
}

export default Header