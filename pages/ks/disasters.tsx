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

const KsDisastersPage = () => {
	const disasters = useMemo(
		() => [
			{
				title: 'Curse: Sudden Spark',
				additional: '(shuffle this disaster card into pile face up.)',
				effect:
					'If this card would be prepared, instead each player takes 5 damages (can be blocked), then discard this and prepare next available card.',
			},
			{
				title: 'Curse: Buring Field',
				additional: '(shuffle this disaster card into pile face up.)',
				effect:
					'If this card would be prepared, instead each player inflicts 2 Bleedings, then discard this and prepare next available card.',
			},
			{
				title: 'Curse: Weakness',
				additional: '(shuffle this disaster card into pile face up.)',
				effect:
					'If this card would be prepared, instead each player inflicts 1 Disarm and 1 Immobolize, then discard this and prepare next available card.',
			},
			{
				title: 'Evolve: Bloodthirsty',
				additional: '(shuffle this disaster card into pile face up.)',
				effect:
					'If this card would be prepared, instead active monster preforms Jump 2 towards player with lowest HP, then discard this and prepare next available card.',
			},
			{
				title: 'Evolve: Shadow Walk',
				additional: '(shuffle this disaster card into pile face up.)',
				effect:
					'If this card would be prepared, instead active monster gains Invisible, then discard this and prepare next available card.',
			},
			{
				title: 'Evolve: Double Strike',
				additional: '(shuffle this disaster card into pile face up.)',
				effect:
					'If this card would be prepared, instead discard this and prepare 2 next available cards.',
			},
			{
				title: 'Acceleration',
				effect:
					'Remove 3 intention cards from game with smallest numbers from shuffling pile.',
			},
			{
				title: 'Acceleration',
				effect:
					'Remove 3 intention cards from game with smallest numbers from shuffling pile.',
			},
			{
				title: 'Evolution',
				effect:
					'For each type of monster in this encounter (include dead), upgrade once.',
			},
			{
				title: 'Evolution',
				effect:
					'For each type of monster in this encounter (include dead), upgrade once.',
			},
			{
				title: 'Rat',
				effect: 'Lose 5 Food.',
			},
			{
				title: 'Rat',
				effect: 'Lose 5 Food.',
			},
			{
				title: 'Regeneration',
				effect: 'Each monster performs Heals 10.',
			},
			{
				title: 'Regeneration',
				effect: 'Each monster performs Heals 10.',
			},
			{
				title: 'Fatigue',
				effect:
					'Each player choose up to 2 action cards from their playing area. Exhaust the rest.',
			},
			{
				title: 'Fatigue',
				effect:
					'Each player choose up to 2 action cards from their playing area. Exhaust the rest.',
			},
			{
				title: 'Fading Power',
				effect:
					'Flip all artifacts. Unflip them after a long rest. (Flipped artifact gives no effect)',
			},
			{
				title: 'Fading Power',
				effect:
					'Flip all artifacts. Unflip them after a long rest. (Flipped artifact gives no effect)',
			},
			{
				title: 'Darkness',
				effect: 'Each monster gains invisible.',
			},
			{
				title: 'Darkness',
				effect: 'Each monster gains invisible.',
			},
			{
				title: 'Heart Attack',
				effect: 'Each player takes 3 Piercing damages.',
			},
			{
				title: 'Heart Attack',
				effect: 'Each player takes 3 Piercing damages.',
			},
			{
				title: "Boss's Power",
				additional:
					'(place this card on boss card. this disaster will affect the final encounter)',
				effect: "Boss's Attack + 2.",
			},
			{
				title: "Boss's Aggressive",
				additional:
					'(place this card on boss card. this disaster will affect the final encounter)',
				effect: "Boss's Move/Jump + 1.",
			},
			{
				title: "Boss's Immutation",
				additional:
					'(place this card on boss card. this disaster will affect the final encounter)',
				effect: 'If Boss would be inflicted a status card, do nothing instead.',
			},
			{
				title: "Boss's Rage",
				additional:
					'(place this card on boss card. this disaster will affect the final encounter)',
				effect:
					'If Boss would perform a Defensive intention, instead performs a Offensive intention with the same value.',
			},
			{
				title: "Boss's Toughness",
				additional:
					'(place this card on boss card. this disaster will affect the final encounter)',
				effect: 'Boss only takes max. 3 damages from each Attack.',
			},
			{
				title: "Boss's Awareness",
				additional:
					'(place this card on boss card. this disaster will affect the final encounter)',
				effect:
					'Whenever a player end its Move/Jump right behind Boss, turn Boss to that player and gain 5 Blocks.',
			},
			{
				title: "Boss's Sharpshooting",
				additional:
					'(place this card on boss card. this disaster will affect the final encounter)',
				effect:
					'If Boss would target no one in an Attack, target the closest player instead.',
			},
			{
				title: "Boss's Aura",
				additional:
					'(place this card on boss card. this disaster will affect the final encounter)',
				effect:
					'Each monsters other than Boss in final encounter has max. HP+5.',
			},
		],
		[]
	)

	return (
		<>
			<div className='px-8 py-24' style={{ width: '180%' }}>
				<div className='flex flex-wrap mb-16'>
					{disasters.map((disaster, i) => (
						<div
							key={i}
							style={{
								background: `url(/images/ks/bg-corruption.png)`,
								backgroundSize: 'cover',
								backgroundPosition: 'center center',
								width: 375,
								height: 262,
								border: '12px solid #333',
								borderRadius: 8,
							}}
						>
							<div className='py-4 px-6 flex flex-col justify-center items-stretch text-center h-full text-white bg-black bg-opacity-50'>
								<div className='text-lg font-bold'>{disaster.title}</div>
								<div className='flex flex-col justify-center items-stretch text-center h-full gap-x-2'>
									{disaster.additional && (
										<div className='space-y-2 mb-4'>
											<div className='text-sm italic'>
												{disaster.additional}
											</div>
											<hr />
										</div>
									)}
									<div>{disaster.effect}</div>
								</div>
							</div>
						</div>
					))}
				</div>
				<div className='flex flex-wrap mb-16'>
					{disasters.map((disaster, i) => (
						<div
							key={i}
							style={{
								background: `url(/images/ks/bg-corruption.png)`,
								backgroundSize: 'cover',
								backgroundPosition: 'center center',
								width: 375,
								height: 262,
								border: '12px solid #333',
								borderRadius: 8,
							}}
						>
							<div className='py-4 px-6 flex flex-col justify-center items-stretch text-center h-full text-white bg-black bg-opacity-50'>
								<div className='text-3xl font-bold'>Disaster</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</>
	)
}

export default KsDisastersPage
