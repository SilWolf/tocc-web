import React, { HTMLAttributes } from 'react'

import cns from 'classnames'

type Props = HTMLAttributes<HTMLSpanElement>

const Chip = ({ className, ...others }: Props): JSX.Element => (
	<span className={cns('p-1 text-xs border', className)} {...others}></span>
)

export default React.memo(Chip)
