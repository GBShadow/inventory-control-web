import { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonProps = {
  children: ReactNode
} & ButtonHTMLAttributes<HTMLButtonElement>

export default function Button({ children, ...rest }: ButtonProps) {
  return (
    <button type='button' className='c-button' {...rest}>
      {children}
    </button>
  )
}
