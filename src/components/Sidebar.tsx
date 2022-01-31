import ActiveLink from 'components/ActiveLink'
import Image from 'next/image'

export default function Sidebar() {
  return (
    <aside className='l-sidebar'>
      <div className='l-sidebar__logo-container'>
        <Image
          src='/images/logo.png'
          width={300}
          height={64}
          alt='Logo'
          objectFit='contain'
        />
      </div>
      <nav className='l-sidebar__menu'>
        <ActiveLink href='/dashboard' activeClassName='active'>
          <a>Dashboard</a>
        </ActiveLink>
        <ActiveLink href='/produtos' activeClassName='active'>
          <a>Produtos</a>
        </ActiveLink>
      </nav>
    </aside>
  )
}
