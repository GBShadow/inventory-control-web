import Header from 'components/Header'
import Sidebar from 'components/Sidebar'
import React, { ReactNode } from 'react'

type DashboardLayoutProps = {
  children: ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className='l-dashboard'>
      <Header />
      <Sidebar />
      <div className='l-dashboard__content'>{children}</div>
    </div>
  )
}
