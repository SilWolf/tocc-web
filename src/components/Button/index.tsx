import React, { ButtonHTMLAttributes } from 'react'

import cns from 'classnames'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: string
}

const Button = ({ href, className, ...props }: Props): JSX.Element => {
  if (href) {
    return (
      <a
        data-ripplet
        href={href}
        className={cns('button text-primary', className)}
      >
        {props.children}
      </a>
    )
  }
  return <button data-ripplet className={cns('button', className)} {...props} />
}

export default React.memo(Button)
