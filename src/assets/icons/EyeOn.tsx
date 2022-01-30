import * as React from 'react'
import { SVGProps } from 'react'

const EyeOn = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width='1em'
    height='1em'
    viewBox='0 0 42 29'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <path
      d='M21 0C11.455 0 3.303 5.937 0 14.318 3.303 22.7 11.455 28.636 21 28.636c9.546 0 17.697-5.937 21-14.318C38.697 5.938 30.546 0 21 0Zm0 23.864c-5.269 0-9.545-4.277-9.545-9.546 0-5.269 4.276-9.545 9.545-9.545 5.27 0 9.546 4.276 9.546 9.545 0 5.27-4.277 9.546-9.546 9.546ZM21 8.59a5.72 5.72 0 0 0-5.727 5.727A5.72 5.72 0 0 0 21 20.046a5.72 5.72 0 0 0 5.727-5.728A5.72 5.72 0 0 0 21 8.591Z'
      fill='currentColor'
    />
  </svg>
)

export default EyeOn
