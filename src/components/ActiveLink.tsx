import { useRouter } from 'next/router'
import Link, { LinkProps } from 'next/link'
import React, { ReactElement } from 'react'

type ActiveLinkProps = {
  children: ReactElement
  activeClassName: string
} & LinkProps

const ActiveLink = ({
  children,
  activeClassName,
  ...rest
}: ActiveLinkProps) => {
  const { asPath } = useRouter()

  const className =
    asPath.split('/')[1] === rest.href.toString().split('/')[1]
      ? activeClassName
      : ''

  console.log(
    <Link {...rest}>{React.cloneElement(children, { className })}</Link>
  )

  return <Link {...rest}>{React.cloneElement(children, { className })}</Link>
}

export default ActiveLink
