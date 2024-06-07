import React from 'react'
import '../Css/Hstyle.css'
import Board from './Board'

function Header() {
  return (
    <div>
      <h2>Tic and Tac</h2>
      <p className='p'>Let's Play</p>
      <Board/>
    </div>
    
  )
}

export default Header