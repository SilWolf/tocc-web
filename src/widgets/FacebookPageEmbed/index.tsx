import React from 'react'

const FacebookPageEmbed = () => {
	return (
		<iframe
			src='https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FTocc5ehk&tabs=timeline&width=340&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=2954824384768206'
			width='340'
			height='500'
			style={{
				border: 'none',
				overflow: 'hidden',
				marginLeft: 'auto',
				marginRight: 'auto',
			}}
			scrolling='no'
			frameBorder='0'
			allowFullScreen={true}
			allow='autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share'
		></iframe>
	)
}

export default React.memo(FacebookPageEmbed)
