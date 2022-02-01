import { SVGProps } from 'react'

const Box = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      enableBackground='new 0 0 24 24'
      viewBox='0 0 24 24'
      height='1em'
      width='1em'
      {...props}
    >
      <g>
        <g>
          <path
            d='M20,2H4C3,2,2,2.9,2,4v3.01C2,7.73,2.43,8.35,3,8.7V20c0,1.1,1.1,2,2,2h14c0.9,0,2-0.9,2-2V8.7c0.57-0.35,1-0.97,1-1.69V4 C22,2.9,21,2,20,2z M19,20H5V9h14V20z M20,7H4V4h16V7z'
            fill='currentColor'
          />
          <rect height='2' width='6' x='9' y='12' fill='currentColor' />
        </g>
      </g>
    </svg>
  )
}

export default Box
