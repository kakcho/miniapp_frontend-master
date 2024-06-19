import React, { useState } from 'react'
import popup from '../../assets/popup.svg'
import notify from '../../assets/Notify.svg'
import './Header.css'
import x from '../../assets/X.svg'

const Header = ({title}) => {
  const [open, setOpen] = useState(false)
  return (
    <div className='header'>
        <img src={notify} alt=""  className='notify'/>
    <div className='title'>{title}</div>
    <img src={popup} alt="" className='popupIcon' onClick={()=>{setOpen(!open)}}/>
    {open && <div className="opacityDiv">
    <div className="widget">
      <div className="blackClose">
        <img src={x} alt="" onClick={()=>{setOpen(!open)}}/>
      </div>
      <a href="/" className='a'><div className="widgetBut">Изменить игру</div></a>
      <a href="/tutor" className='a'><div className="widgetBut">Смотреть туториал</div></a>
    </div></div>}
    </div>
  )
}

export default Header