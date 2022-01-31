import { SVGProps } from 'react'

const SvgArrowDown = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width='1em'
    height='1em'
    viewBox='0 0 42 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <path
      d='M21 23.941c.753 0 1.506-.287 2.08-.86L41.139 5.02a2.941 2.941 0 1 0-4.16-4.16L21 16.841 5.021.861a2.941 2.941 0 0 0-4.159 4.16l18.06 18.06c.573.573 1.326.86 2.078.86Z'
      fill='currentColor'
    />
  </svg>
)

export default SvgArrowDown
