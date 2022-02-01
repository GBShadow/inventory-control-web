import { SVGProps } from 'react'

const Menu = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      height='1em'
      width='1em'
      {...props}
    >
      <path
        d='M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z'
        fill='currentColor'
      />
    </svg>
  )
}

export default Menu
