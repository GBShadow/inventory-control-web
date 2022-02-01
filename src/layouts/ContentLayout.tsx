import { ReactNode } from 'react'

type ContentLayoutProps = {
  children: ReactNode
  title: string
}

export default function ContentLayout({ title, children }: ContentLayoutProps) {
  return (
    <div className='l-content'>
      <h1 className='l-content__title'>{title}</h1>

      <div className='l-content__box'>{children}</div>
    </div>
  )
}
