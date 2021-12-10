import React, { ImgHTMLAttributes, useMemo } from 'react'

import { Media } from 'src/types/utils/Media.type'

type Props = ImgHTMLAttributes<HTMLImageElement> & {
	image: Media | undefined
	size?: 'thumbnail' | 'small' | 'medium' | 'large'
}

const PLACEHOLDER_AVATAR_DWARF = '/images/avatar/avatar-dwarf.png'

const StrapiImg = ({ image, size, src, ...others }: Props): JSX.Element => {
	const { _src, _width, _height } = useMemo(() => {
		if (!image || !image.url) {
			return {
				_src: PLACEHOLDER_AVATAR_DWARF,
				_width: 0,
				_height: 0,
			}
		}

		if (size) {
			const _image = image.formats?.[size]
			if (_image) {
				return {
					_src: _image.url,
					_width: _image.width,
					_height: _image.height,
				}
			}
		}

		return {
			_src: image.url,
			_width: image.width,
			_height: image.height,
		}
	}, [image, size])

	return <img src={_src} width={_width} height={_height} alt='' {...others} />
}

export default React.memo(StrapiImg)
