import React from 'react'
import Bar from '../Bar/Bar'
import Header from '../Header/Header'
import './Find.css'
import Command from './Command'

const Find = () => {
  return (
    <div className='findContainer'>
      <Header title={'Поиск'}/>
      <div className="sup Finder">Ваши команды</div>
        <Command commandName={'ELan'}/>

      <Bar/>
    </div>
  )
}

export default Find