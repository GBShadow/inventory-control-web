import SvgArrowDown from 'assets/icons/ArrowDown'
import Menu from 'assets/icons/Menu'
import { useAuth } from 'hooks/useAuth'
import { useMenu } from 'hooks/useMenu'
import Link from 'next/link'
import React, { useState } from 'react'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  const { user, signOut } = useAuth()
  const { menuToggle } = useMenu()

  return (
    <header className='l-header'>
      <button className='l-header__menu' onClick={menuToggle}>
        <Menu />
      </button>

      <div className='l-header__dropdown'>
        <button
          className='l-header__dropdown-button'
          onClick={() => setIsOpen(!isOpen)}
        >
          <p>{user?.email}</p>
          <SvgArrowDown />
        </button>

        <div className={`l-header__dropdown-menu ${isOpen && 'u-open'}`}>
          <button className='l-header__dropdown-item' onClick={signOut}>
            Sair da aplicação
          </button>
        </div>
      </div>
    </header>
  )
}
