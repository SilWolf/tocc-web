import React, { useMemo } from 'react'

import HtmlToReact from 'html-to-react'

type Props = React.HTMLAttributes<HTMLDivElement>

const ReactHTML = ({ children, ...others }: Props) => {
	const htmlToReactParser = useMemo(() => new HtmlToReact.Parser(), [])

	return <div {...others}>{htmlToReactParser.parse(children)}</div>
}

export default React.memo(ReactHTML)
