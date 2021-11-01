import { useMemo } from 'react'

const OFFENSIVE = 'offensive'
const DEFENSIVE = 'defensive'
const SPECIAL = 'special'
const MORPH = 'morph'
const EVOLVE = 'evolve'

const RESOURCES: Record<
	string,
	{ text: string; color: string; background: string; iconSrc: string }
> = {
	[OFFENSIVE]: {
		text: 'Offense',
		color: '#FF4140',
		background: '#E8B4B1',
		iconSrc: '/images/ks/offense-icon.png',
	},
	[DEFENSIVE]: {
		text: 'Defense',
		color: '#41CAFF',
		background: '#BEFEFF',
		iconSrc: '/images/ks/defense-icon.png',
	},
	[SPECIAL]: {
		text: 'Special',
		color: '#FF9141',
		background: '#FFE2B8',
		iconSrc: '/images/ks/special-icon.png',
	},
	[MORPH]: {
		text: 'Morph',
		color: '#9a4abd',
		background: '#d694f2',
		iconSrc: '/images/ks/morph-icon.png',
	},
	[EVOLVE]: {
		text: 'Evolve',
		color: '#9a4abd',
		background: '#d694f2',
		iconSrc: '/images/ks/morph-icon.png',
	},
}

const KsTokensPage = () => {
	const tokens = useMemo(
		() => [
			...Array(4)
				.fill(undefined)
				.map(() => ({
					name: 'invisible',
					body: (
						<div className='text-center'>
							<div>
								<img
									src='/images/ks/icon-invisible.png'
									className='w-10 h-10 mx-auto'
									alt=''
								/>
							</div>
							<p className='font-bold text-sm leading-3'>Invisible</p>
						</div>
					),
					background: '#342747',
					color: '#fff',
				})),
			...Array(4)
				.fill(undefined)
				.map(() => ({
					name: 'invisible',
					body: (
						<div className='text-center'>
							<p className='text-xs leading-3'>Monster</p>
							<p className='font-bold text-4xl'>A</p>
						</div>
					),
					background: '#1b1f30',
					color: '#fff',
				})),
			...Array(4)
				.fill(undefined)
				.map(() => ({
					name: 'invisible',
					body: (
						<div className='text-center'>
							<p className='text-xs leading-3'>Monster</p>
							<p className='font-bold text-4xl'>B</p>
						</div>
					),
					background: '#1b1f30',
					color: '#fff',
				})),
			...Array(4)
				.fill(undefined)
				.map(() => ({
					name: 'invisible',
					body: (
						<div className='text-center'>
							<p className='text-xs leading-3'>Monster</p>
							<p className='font-bold text-4xl'>C</p>
						</div>
					),
					background: '#1b1f30',
					color: '#fff',
				})),
			...Array(4)
				.fill(undefined)
				.map(() => ({
					name: 'invisible',
					body: (
						<div className='text-center'>
							<p className='text-xs leading-3'>Monster</p>
							<p className='font-bold text-4xl'>D</p>
						</div>
					),
					background: '#1b1f30',
					color: '#fff',
				})),
			...Array(4)
				.fill(undefined)
				.map(() => ({
					name: 'invisible',
					body: (
						<div className='text-center'>
							<p className='text-xs leading-3'>Monster</p>
							<p className='font-bold text-4xl'>E</p>
						</div>
					),
					background: '#1b1f30',
					color: '#fff',
				})),
		],
		[]
	)

	return (
		<>
			<div className='px-8 py-24' style={{ width: '75%' }}>
				<div className='flex flex-wrap mb-16'>
					{tokens.map((token, i) => (
						<div
							key={i}
							className='w-20 h-20 rounded-full bg-gray-300 border border-black flex items-center justify-center p-2'
							style={{
								background: token.background,
								color: token.color,
							}}
						>
							{token.body}
						</div>
					))}
				</div>
			</div>
		</>
	)
}

export default KsTokensPage
