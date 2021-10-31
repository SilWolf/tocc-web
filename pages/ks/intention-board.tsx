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

const KsIntetionsPage = () => {
	const intentions = useMemo(
		() => [
			...[1, 2, 3, 4].map((num) => ({
				frontType: OFFENSIVE,
				frontNum: num,
				nextType: OFFENSIVE,
				backType: OFFENSIVE,
				pileTypes: [OFFENSIVE],
				backNum: '1-4',
			})),
			...[1, 2].map((num) => ({
				frontType: OFFENSIVE,
				frontNum: num,
				nextType: SPECIAL,
				backType: OFFENSIVE,
				pileTypes: [OFFENSIVE],
				backNum: '1-4',
			})),
			...[3, 4].map((num) => ({
				frontType: OFFENSIVE,
				frontNum: num,
				nextType: OFFENSIVE,
				backType: OFFENSIVE,
				pileTypes: [OFFENSIVE],
				backNum: '1-4',
			})),
			...[3, 4, 5, 6].map((num) => ({
				frontType: OFFENSIVE,
				frontNum: num,
				nextType: DEFENSIVE,
				backType: OFFENSIVE,
				pileTypes: [OFFENSIVE],
				backNum: '3-6',
			})),
			...[1, 2, 3, 4].map((num) => ({
				frontType: DEFENSIVE,
				frontNum: num,
				nextType: SPECIAL,
				backType: DEFENSIVE,
				pileTypes: [DEFENSIVE],
				backNum: '1-4',
			})),
			...[1, 2].map((num) => ({
				frontType: DEFENSIVE,
				frontNum: num,
				nextType: SPECIAL,
				backType: DEFENSIVE,
				pileTypes: [DEFENSIVE],
				backNum: '1-4',
			})),
			...[3, 4].map((num) => ({
				frontType: DEFENSIVE,
				frontNum: num,
				nextType: OFFENSIVE,
				backType: DEFENSIVE,
				pileTypes: [DEFENSIVE],
				backNum: '1-4',
			})),
			...[3, 4, 5, 6].map((num) => ({
				frontType: DEFENSIVE,
				frontNum: num,
				nextType: OFFENSIVE,
				backType: DEFENSIVE,
				pileTypes: [DEFENSIVE],
				backNum: '3-6',
			})),
			...['A', 'B', 'C', 'D'].map((num) => ({
				frontType: SPECIAL,
				frontNum: num,
				nextType: OFFENSIVE,
				backType: SPECIAL,
				pileTypes: [SPECIAL],
				backNum: 'Any',
			})),
			...['A', 'B', 'C', 'D'].map((num) => ({
				frontType: SPECIAL,
				frontNum: num,
				nextType: OFFENSIVE,
				backType: SPECIAL,
				pileTypes: [SPECIAL],
				backNum: 'Any',
			})),
			...['A', 'B', 'C', 'D'].map((num) => ({
				frontType: SPECIAL,
				frontNum: num,
				nextType: DEFENSIVE,
				backType: SPECIAL,
				pileTypes: [SPECIAL],
				backNum: 'Any',
			})),
			...[6, 6, 6, 6, 6, 6].map((num) => ({
				frontType: OFFENSIVE,
				frontNum: num,
				nextType: DEFENSIVE,
				backType: OFFENSIVE,
				pileTypes: [OFFENSIVE, EVOLVE],
				backNum: '6',
			})),
			...[6, 6].map((num) => ({
				frontType: OFFENSIVE,
				frontNum: num,
				nextType: SPECIAL,
				backType: OFFENSIVE,
				pileTypes: [OFFENSIVE, EVOLVE],
				backNum: '6',
			})),
			...[6, 6, 6, 6, 6, 6].map((num) => ({
				frontType: DEFENSIVE,
				frontNum: num,
				nextType: OFFENSIVE,
				backType: DEFENSIVE,
				pileTypes: [DEFENSIVE, EVOLVE],
				backNum: '6',
			})),
			...[6, 6].map((num) => ({
				frontType: DEFENSIVE,
				frontNum: num,
				nextType: SPECIAL,
				backType: DEFENSIVE,
				pileTypes: [DEFENSIVE, EVOLVE],
				backNum: '6',
			})),
			...['A', 'B', 'C', 'D', 'A', 'B', 'C', 'D'].map((num) => ({
				frontType: SPECIAL,
				frontNum: num,
				nextType: OFFENSIVE,
				backType: SPECIAL,
				pileTypes: [SPECIAL, EVOLVE],
				backNum: 'Any',
			})),
		],
		[]
	)

	return (
		<>
			<div className='flex'>
				<div className='flex-none'>
					<div
						className='grid grid-cols-3 p-4 gap-4 mt-24 ml-8'
						style={{
							background: `url('/images/ks/board-bg.jpg')`,
							backgroundSize: 'cover',
						}}
					>
						<div
							className='border border-white rounded flex items-center justify-center text-sm text-white text-center p-4'
							style={{
								width: 400,
								height: 300,
								background: `url(${RESOURCES[OFFENSIVE].iconSrc})`,
								backgroundSize: '15%',
								backgroundRepeat: 'no-repeat',
								backgroundPosition: 'center 15px',
							}}
						>
							Add one random Offense Evolve card into discard pile, then
							reshuffle discard pile and form a new draw pile. <br /> <br />
							If you can&apos;t, you are overwhelmed by this non-stop evolving
							corruption. You spend your last bullet, scream until last breath,
							and your adventure ends here.
						</div>
						<div
							className='border border-white rounded flex items-center justify-center text-sm text-white text-center p-4'
							style={{
								width: 400,
								height: 300,
								background: `url(${RESOURCES[DEFENSIVE].iconSrc})`,
								backgroundSize: '15%',
								backgroundRepeat: 'no-repeat',
								backgroundPosition: 'center 15px',
							}}
						>
							Add one random Defense Evolve card into discard pile, then
							reshuffle discard pile and form a new draw pile. <br /> <br />
							If you can&apos;t, your body can no longer resist to the
							evolution. You become something that you slumber a lot on the way,
							and your adventure ends here.
						</div>
						<div
							className='border border-white rounded flex items-center justify-center text-sm text-white text-center p-4'
							style={{
								width: 400,
								height: 300,
								background: `url(${RESOURCES[SPECIAL].iconSrc})`,
								backgroundSize: '15%',
								backgroundRepeat: 'no-repeat',
								backgroundPosition: 'center 15px',
							}}
						>
							Add one random Special Evolve card into discard pile, then
							reshuffle discard pile and form a new draw pile. <br />
							<br />
							If you can&apos;t, you learn the truth of this world, and you turn
							into the executor of your God. You become the one who ends human
							era, and your adventure ends here.
						</div>
						<div
							className='border border-white rounded flex items-center justify-center text-sm text-white text-center p-4'
							style={{
								width: 400,
								height: 300,
							}}
						>
							discard pile
						</div>
						<div
							className='border border-white rounded flex items-center justify-center text-sm text-white text-center p-4'
							style={{
								width: 400,
								height: 300,
							}}
						>
							discard pile
						</div>
						<div
							className='border border-white rounded flex items-center justify-center text-sm text-white text-center p-4'
							style={{
								width: 400,
								height: 300,
							}}
						>
							discard pile
						</div>
					</div>
				</div>
			</div>
			<div className='px-8 py-24' style={{ width: '180%' }}>
				<div className='flex flex-wrap mb-16'>
					{intentions.map((intention, i) => (
						<div
							key={i}
							style={{
								width: 375,
								height: 262,
								border: '12px solid #333',
								borderRadius: 8,
							}}
						>
							<div className='flex items-stretch h-full'>
								<div className='flex-1 relative'>
									<div className='absolute top-1 left-1 flex flex-nowrap'>
										<div
											style={{
												backgroundColor: RESOURCES[intention.frontType].color,
												width: 24,
												height: 24,
												WebkitMaskImage: `url('${
													RESOURCES[intention.frontType].iconSrc
												}')`,
												WebkitMaskPosition: 'center',
												WebkitMaskSize: 'cover',
											}}
										></div>
										<span
											style={{
												fontSize: '24px',
												lineHeight: '24px',
												color: RESOURCES[intention.frontType].color,
											}}
										>
											{intention.frontNum}
										</span>
									</div>

									<div
										className='absolute bottom-0 left-0 p-0.5 rounded-tr flex flex-nowrap gap-x-1'
										style={{
											background: '#333',
										}}
									>
										{intention.pileTypes.map((pileType, pileTypeI) => (
											<div className='flex items-center' key={pileTypeI}>
												<div
													style={{
														backgroundColor: '#ddd',
														width: 14,
														height: 14,
														WebkitMaskImage: `url('${RESOURCES[pileType].iconSrc}')`,
														WebkitMaskPosition: 'center',
														WebkitMaskSize: 'cover',
													}}
												></div>
												<span
													style={{
														fontSize: '12px',
														lineHeight: '12px',
														fontWeight: 300,
														fontStyle: 'italic',
														color: '#ddd',
													}}
												>
													{RESOURCES[pileType].text}
												</span>
											</div>
										))}
									</div>

									<div
										className='flex h-full w-full flex-col justify-center items-center'
										style={{
											background: RESOURCES[intention.frontType].background,
										}}
									>
										<div className='flex-none flex justify-center items-center'>
											<div
												style={{
													backgroundColor: RESOURCES[intention.frontType].color,
													width: 96,
													height: 96,
													WebkitMaskImage: `url('${
														RESOURCES[intention.frontType].iconSrc
													}')`,
													WebkitMaskPosition: 'center',
													WebkitMaskSize: 'cover',
												}}
											></div>
											<span
												style={{
													fontSize: '96px',
													lineHeight: '96px',
													color: RESOURCES[intention.frontType].color,
												}}
											>
												{intention.frontNum}
											</span>
										</div>
										<div className='flex-none text-center leading-4 text-sm bg-white rounded-md bg-opacity-50 py-1 px-4'>
											Active monster executes <br /> its{' '}
											<strong>
												{RESOURCES[intention.frontType].text}{' '}
												{intention.frontNum}
											</strong>
										</div>
									</div>
									{/* 
									<div
										className='absolute bottom-1 right-1 flex flex-nowrap transform rotate-180'
										style={{
											background: RESOURCES[intention.frontType].background,
										}}
									>
										<div
											style={{
												backgroundColor: RESOURCES[intention.frontType].color,
												width: 32,
												height: 32,
												WebkitMaskImage: `url('${
													RESOURCES[intention.frontType].iconSrc
												}')`,
												WebkitMaskPosition: 'center',
												WebkitMaskSize: 'cover',
											}}
										></div>
										<span
											style={{
												fontSize: '32px',
												lineHeight: '32px',
												color: RESOURCES[intention.frontType].color,
											}}
										>
											{intention.frontNum}
										</span>
									</div> */}
								</div>
								<div
									className='flex items-center justify-center bg-gray-500'
									style={{ width: 18, boxShadow: '#666 1px 0 2px', zIndex: 1 }}
								>
									<i
										className='bi bi-caret-right-fill'
										style={{ fontSize: 24, marginLeft: -3, color: '#fff' }}
									></i>
								</div>
								<div
									style={{
										width: '100px',
										background: `linear-gradient(to left, ${
											RESOURCES[intention.nextType].background
										}, #fff)`,
										// background: '#fff',
									}}
								>
									<div className='flex h-full flex-col justify-center items-center text-center text-sm'>
										<p className='mb-4'>
											activate
											<br />
											next card.
										</p>
										<p>
											If none, prepare top card from{' '}
											<strong>{RESOURCES[intention.nextType].text}</strong> pile
										</p>
										<div
											className='border border-black py-1 px-2 rounded mt-2'
											style={{
												background: RESOURCES[intention.nextType].background,
											}}
										>
											<div
												style={{
													backgroundColor: RESOURCES[intention.nextType].color,
													width: 28,
													height: 28,
													WebkitMaskImage: `url('${
														RESOURCES[intention.nextType].iconSrc
													}')`,
													WebkitMaskPosition: 'center',
													WebkitMaskSize: 'cover',
												}}
											></div>
										</div>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
				<div className='flex flex-wrap mb-16'>
					{intentions.map((intention, i) => (
						<div
							key={i}
							style={{
								width: 375,
								height: 262,
								border: '12px solid #333',
								borderRadius: 8,
							}}
						>
							<div className='flex items-stretch h-full'>
								<div className='flex-1 relative'>
									<div
										className='flex h-full w-full flex-col justify-center items-center'
										style={{
											background: RESOURCES[intention.backType].background,
										}}
									>
										<div className='flex-none flex justify-center items-center'>
											<div
												style={{
													backgroundColor: RESOURCES[intention.backType].color,
													width: 96,
													height: 96,
													WebkitMaskImage: `url('${
														RESOURCES[intention.backType].iconSrc
													}')`,
													WebkitMaskPosition: 'center',
													WebkitMaskSize: 'cover',
												}}
											></div>
											<span
												style={{
													fontSize: '96px',
													lineHeight: '96px',
													color: RESOURCES[intention.backType].color,
												}}
											>
												{intention.backNum}
											</span>
										</div>
										<div className='flex-none text-center leading-4 text-sm bg-white rounded-md bg-opacity-50 py-1 px-2 mt-2'>
											{intention.backType === MORPH ? (
												<p>
													When prepare this morph card, also prepare next card
													after this.
												</p>
											) : (
												<p>
													At the action phase of active monster&apos;s turn,
													<br /> flip this card and follow any instruction.
												</p>
											)}
											{intention.backType === SPECIAL && (
												<p className='mt-1'>
													<strong className='text-red-700'>ATTENTION!</strong>{' '}
													Intention value cannot be changed!
												</p>
											)}
										</div>
									</div>
									{/* 
									<div
										className='absolute bottom-1 right-1 flex flex-nowrap transform rotate-180'
										style={{
											background: RESOURCES[intention.frontType].background,
										}}
									>
										<div
											style={{
												backgroundColor: RESOURCES[intention.frontType].color,
												width: 32,
												height: 32,
												WebkitMaskImage: `url('${
													RESOURCES[intention.frontType].iconSrc
												}')`,
												WebkitMaskPosition: 'center',
												WebkitMaskSize: 'cover',
											}}
										></div>
										<span
											style={{
												fontSize: '32px',
												lineHeight: '32px',
												color: RESOURCES[intention.frontType].color,
											}}
										>
											{intention.frontNum}
										</span>
									</div> */}
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</>
	)
}

export default KsIntetionsPage
