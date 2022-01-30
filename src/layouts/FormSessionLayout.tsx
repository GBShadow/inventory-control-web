import React, { ReactNode } from 'react'

type FormSessionLayoutProps = {
  children: ReactNode
}

export default function FormSessionLayout({
  children,
}: FormSessionLayoutProps) {
  return <div className='l-form-session'>{children}</div>
}
