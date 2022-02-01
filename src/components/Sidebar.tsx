import Box from 'assets/icons/Box'
import BoxOpen from 'assets/icons/BoxOpen'
import Dashboard from 'assets/icons/Dashboard'
import ActiveLink from 'components/ActiveLink'
import { useAuth } from 'hooks/useAuth'
import { useMenu } from 'hooks/useMenu'

export default function Sidebar() {
  const { menuIsOpen, menuToggle } = useMenu()

  const { user } = useAuth()

  const Adm = user.roles.some(role => role === 'ADM')

  return (
    <aside className={`l-sidebar ${menuIsOpen ? 'u-open' : 'u-close'}`}>
      <div className='l-sidebar__logo-container' onClick={menuToggle}>
        <BoxOpen className='l-sidebar__logo' />
        {menuIsOpen && 'Inventory Control'}
      </div>
      <nav className='l-sidebar__menu'>
        {Adm && (
          <ActiveLink href='/dashboard' activeClassName='u-active'>
            <a className='l-sidebar__link'>
              <Dashboard className='l-sidebar__icon' />
              {menuIsOpen && 'Usuários'}
            </a>
          </ActiveLink>
        )}
        <ActiveLink href='/produtos' activeClassName='u-active'>
          <a className='l-sidebar__link'>
            <Box className='l-sidebar__icon' />
            {menuIsOpen && 'Produtos'}
          </a>
        </ActiveLink>
      </nav>
    </aside>
  )
}
