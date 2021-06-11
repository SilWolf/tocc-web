import { NextPage } from 'next'

const CharacterDetailPage: NextPage = () => {
	return (
		<div className='container py-24 bg-white'>
			<p className='bg-white text-center rounded px-8 py-4 space-y-4'>
				<h3>卡洛特</h3>
				<p>尤克特克希爾小隊副隊長．傳奇冒險者戰士</p>
				<div className='grid grid-cols-3 gap-x-2'>
					<div>狼人</div>
					<div>Lv 13 戰士</div>
					<div>士兵</div>
				</div>
			</p>

			<div className='grid grid-cols-3'>
				<div>
					<div>
						<div className='h-20 w-20 text-center leading-3xl rounded-full border-4 border-red-300'>
							<span className='text-3xl leading-none'>12</span>
						</div>
					</div>
				</div>
			</div>
			<img src='/images/sheet-2.jpg' />
		</div>
	)
}
export default CharacterDetailPage
