import React, { HTMLAttributes } from 'react'

import cns from 'classnames'

type Props = HTMLAttributes<HTMLDivElement> & {
  src?: string | undefined
}

const BgImage = ({ src, className, ...others }: Props): JSX.Element => (
  <div
    className={cns('bg-cover bg-center bg-gray-200', className)}
    style={{ backgroundImage: src ? `url('${src || ''}')` : 'none' }}
    {...others}
  ></div>
)

export default React.memo(BgImage)
