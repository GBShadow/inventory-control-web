import SvgArrowDown from 'assets/icons/ArrowDown'
import Link from 'next/link'
import React, { useState } from 'react'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className='l-header'>
      {/* <Link href='/'>
        <a className='l-header__logo'>Controle de estoque</a>
      </Link> */}

      <div className='l-header__dropdown'>
        <button
          className='l-header__dropdown-button'
          onClick={() => setIsOpen(!isOpen)}
        >
          <p>gbs.shadow@gmail.com</p>
          <SvgArrowDown />
        </button>

        <div className={`l-header__dropdown-menu ${isOpen && 'u-open'}`}>
          <button className='l-header__dropdown-item'>Editar perfil</button>
          <button className='l-header__dropdown-item'>Sair da aplicação</button>
        </div>
      </div>
    </header>
  )
}
