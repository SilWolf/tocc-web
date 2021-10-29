import React, { ImgHTMLAttributes, useMemo } from 'react'
import { Media } from 'src/types/utils/Media.type'

type Props = ImgHTMLAttributes<HTMLImageElement> & {
	image: Media | undefined
	size?: 'thumbnail' | 'small' | 'medium' | 'large'
}

const PLACEHOLDER_AVATAR_DWARF = '/images/avatar/avatar-dwarf.png'

const StrapiImg = ({ image, size, ...others }: Props): JSX.Element => {
	const { url, width, height } = useMemo(() => {
		if (!image) {
			return {
				url: PLACEHOLDER_AVATAR_DWARF,
				width: 0,
				height: 0,
			}
		}

		if (size) {
			const _image = image.formats?.[size]
			if (_image) {
				return {
					url: _image.url,
					width: _image.width,
					height: _image.height,
				}
			}
		}

		return {
			url: image.url,
			width: image.width,
			height: image.height,
		}
	}, [size])

	return <img src={url} width={width} height={height} {...others} />
}

export default React.memo(StrapiImg)
