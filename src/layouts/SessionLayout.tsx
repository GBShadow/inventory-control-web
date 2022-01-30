import React, { ReactNode } from 'react'

type SessionLayoutProps = {
  children: ReactNode
}

export default function SessionLayout({ children }: SessionLayoutProps) {
  return (
    <div className='l-session'>
      <div className='l-session__content'>{children}</div>
    </div>
  )
}
