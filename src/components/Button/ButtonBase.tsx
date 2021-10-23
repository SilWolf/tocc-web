import React, { HTMLAttributes } from 'react'

import cns from 'classnames'

type Props = HTMLAttributes<HTMLDivElement> & {
  href?: string
}

const ButtonBase = ({ href, className, ...props }: Props): JSX.Element => {
  if (href) {
    return (
      <a
        data-ripplet
        href={href}
        className={cns('block cursor-pointer', className)}
      >
        {props.children}
      </a>
    )
  }
  return (
    <div
      data-ripplet
      className={cns('block cursor-pointer', className)}
      {...props}
    />
  )
}

export default React.memo(ButtonBase)
