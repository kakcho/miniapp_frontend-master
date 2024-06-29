import React, { useState } from 'react'
import popup from '../../assets/popup.svg'
import info from '../../assets/info.svg'
import './Header.css'
import x from '../../assets/X.svg'

const Header = ({title}) => {
  const [open, setOpen] = useState(false)
  return (
    <div className='header'>
        <a href="/tutor" className='a'><button className='notify'><img src={info} alt="" /></button></a>
    <div className='title'>{title}</div>
    <a href="/" className='a'><button className='popupIcon'><img src={popup} alt="" /></button></a>
    </div>
  )
}

export default Header