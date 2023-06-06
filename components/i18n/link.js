import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

const LinkComponent = ({ children, skipLocaleHandling, shallow = false, ...rest }) => {
  const router = useRouter()
  const locale = rest.locale || router.query.locale || ''

  let href = rest.href || router.asPath
  if (locale && !skipLocaleHandling) {
    href = href
      ? `/${locale}${href}`
      : router.pathname.replace('[locale]', locale)
  }

  return (
    <Link {...rest} href={href} shallow={shallow}>
      {children}
    </Link>
  )
}

export default LinkComponent