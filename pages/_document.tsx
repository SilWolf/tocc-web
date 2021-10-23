import Document, {
	DocumentContext,
	DocumentInitialProps,
	Head,
	Html,
	Main,
	NextScript,
} from 'next/document'
import Script from 'next/script'

class MyDocument extends Document {
	static async getInitialProps(
		ctx: DocumentContext
	): Promise<DocumentInitialProps> {
		const initialProps = await Document.getInitialProps(ctx)
		return { ...initialProps }
	}

	render(): JSX.Element {
		return (
			<Html>
				<Head>
					<link rel='preconnect' href='https://fonts.googleapis.com' />
					<link
						rel='preconnect'
						href='https://fonts.gstatic.com'
						crossOrigin='1'
					/>
					<link
						href='https://fonts.googleapis.com/css2?family=Roboto&display=swap'
						rel='stylesheet'
					/>
					<script type='module' src='/js/ripplet-declarative.min.js'></script>
				</Head>
				<body>
					<Main />
					<NextScript />
					<div id='fb-root'></div>
					<script
						async
						defer
						crossOrigin='anonymous'
						src='https://connect.facebook.net/zh_TW/sdk.js#xfbml=1&version=v12.0&appId=2954824384768206&autoLogAppEvents=1'
						nonce='c9KAci5O'
					></script>
				</body>
			</Html>
		)
	}
}

export default MyDocument
