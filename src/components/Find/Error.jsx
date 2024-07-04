import React from 'react'
import './Find.css'
import x from '../../assets/X.svg'

const Error = ({setOpen}) => {
  return (
    <div className='errorModal'>
        <button className='popupIconError' onClick={()=>{setOpen(false)}}><img src={x} alt="" /></button>
        <div className="errorContent">У вас слишком большой разброс рейтинга</div></div>
  )
}

export default Error