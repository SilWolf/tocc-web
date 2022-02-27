import { useMemo } from 'react'

const OFFENSIVE = 'offensive'
const DEFENSIVE = 'defensive'
const SPECIAL = 'special'
const MORPH = 'morph'

const MINOR = 'minor'
const NORMAL = 'normal'
const ADVANCED = 'advanced'
const ELITE = 'elite'

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
	[MINOR]: {
		text: 'Minor',
		color: '#58871a',
		background: 'rgba(204, 232, 190, 0.8)',
		iconSrc: '/images/ks/morph-icon.png',
	},
	[NORMAL]: {
		text: 'Normal',
		color: '#4a4a4a',
		background: 'rgba(171, 171, 171, 0.8)',
		iconSrc: '/images/ks/morph-icon.png',
	},
	[ADVANCED]: {
		text: 'Advanced',
		color: '#db8100',
		background: 'rgba(232, 198, 149, 0.8)',
		iconSrc: '/images/ks/morph-icon.png',
	},
	[ELITE]: {
		text: 'Elite',
		color: '#b80012',
		background: 'rgba(235, 71, 42, 0.8)',
		iconSrc: '/images/ks/morph-icon.png',
	},
}

const KsMonstersPage = () => {
	const monsters = useMemo(
		() =>
			[
				{
					name: 'Thug',
					lv: MINOR,
					imageSrc: '/images/ks/monster-thug.png',
					hp: 20,
					role: 'Striker',
					firstIntention: OFFENSIVE,
					actions: [
						{
							intention: OFFENSIVE,
							values: [0],
							content: <p>Attack 3 (R 1).</p>,
						},
						{
							intention: OFFENSIVE,
							values: [1, 2, 3, 4, 5, 6],
							content: (
								<p>
									Move 2.
									<br />
									Attack 3 (R 1). Inflict 1 Bleeding (R 1).
								</p>
							),
						},
						{
							intention: DEFENSIVE,
							values: [0],
							content: <p>Block 5.</p>,
						},
						{
							intention: DEFENSIVE,
							values: [1, 2, 3, 4, 5, 6],
							content: (
								<p>
									Move 2.
									<br />
									Block 5. Inflict 1 Bleeding (R 1).
									<br />
								</p>
							),
						},
						{
							intention: SPECIAL,
							values: ['A', 'B', 'C', 'D'],
							content: <p>Attack 3 & Inflict 1 Bleeding (R 4-1).</p>,
						},
					],
				},
				{
					name: 'Thug',
					lv: NORMAL,
					imageSrc: '/images/ks/monster-thug.png',
					hp: 25,
					role: 'Striker',
					firstIntention: OFFENSIVE,
					actions: [
						{
							intention: OFFENSIVE,
							values: [0],
							content: <p>Attack 3 (R 1).</p>,
						},
						{
							intention: OFFENSIVE,
							values: [1, 2, 3, 4, 5, 6],
							content: (
								<p>
									Move 2.
									<br />
									Attack 3 (R 1). Inflict 1 Bleedings. (R 1).
								</p>
							),
						},
						{
							intention: DEFENSIVE,
							values: [0],
							content: <p>Block 5.</p>,
						},
						{
							intention: DEFENSIVE,
							values: [1, 2],
							content: (
								<p>
									Move 2.
									<br />
									Block 5. Inflict 2 Bleedings (R 1).
									<br />
								</p>
							),
						},
						{
							intention: DEFENSIVE,
							values: [3, 4, 5, 6],
							content: (
								<p>
									Move 2.
									<br />
									Inflict 3 Bleedings (R 1).
									<br />
								</p>
							),
						},
						{
							intention: SPECIAL,
							values: ['A', 'B', 'C', 'D'],
							content: <p>Attack 3 & Inflict 1 Bleeding (R 4-1).</p>,
						},
					],
				},
				{
					name: 'Thug',
					lv: ADVANCED,
					imageSrc: '/images/ks/monster-thug.png',
					hp: 25,
					role: 'Striker',
					firstIntention: OFFENSIVE,
					actions: [
						{
							intention: OFFENSIVE,
							values: [0],
							content: <p>Attack 3 (R 1).</p>,
						},
						{
							intention: OFFENSIVE,
							values: [1, 2],
							content: (
								<p>
									Move 2.
									<br />
									Attack 3 (R 1). Inflict 2 Bleedings. (R 1).
								</p>
							),
						},
						{
							intention: OFFENSIVE,
							values: [3, 4, 5, 6],
							content: (
								<p>
									Move 2.
									<br />
									Attack 5 (R 1). Piercing Attack 1 (R 1).
								</p>
							),
						},
						{
							intention: DEFENSIVE,
							values: [0],
							content: <p>Block 5.</p>,
						},
						{
							intention: DEFENSIVE,
							values: [1, 2],
							content: (
								<p>
									Move 2.
									<br />
									Block 5. Inflict 2 Bleedings (R 1).
									<br />
								</p>
							),
						},
						{
							intention: DEFENSIVE,
							values: [3, 4, 5, 6],
							content: (
								<p>
									Move 2.
									<br />
									Inflict 3 Bleedings (R 1).
									<br />
								</p>
							),
						},
						{
							intention: SPECIAL,
							values: ['A', 'B', 'C', 'D'],
							content: <p>Attack 4 & Inflict 2 Bleedings (R 4-1).</p>,
						},
					],
				},
				{
					name: 'Thug',
					lv: ELITE,
					imageSrc: '/images/ks/monster-thug.png',
					hp: 30,
					role: 'Striker',
					firstIntention: OFFENSIVE,
					actions: [
						{
							intention: OFFENSIVE,
							values: [0],
							content: <p>Attack 4 (R 1).</p>,
						},
						{
							intention: OFFENSIVE,
							values: [1, 2],
							content: (
								<p>
									Move 2.
									<br />
									Attack 4 (R 1). Inflict 2 Bleedings. (R 1).
								</p>
							),
						},
						{
							intention: OFFENSIVE,
							values: [3, 4, 5, 6],
							content: (
								<p>
									Move 2.
									<br />
									Attack 6 (R 1). Piercing Attack 1 (R 1).
								</p>
							),
						},
						{
							intention: DEFENSIVE,
							values: [0],
							content: (
								<p>
									<span className='text-red-700'>Attack 4 (R 1)</span>.
								</p>
							),
						},
						{
							intention: DEFENSIVE,
							values: [1, 2],
							content: (
								<p>
									Move 2.
									<br />
									<span className='text-red-700'>Attack 4 (R 1)</span>. Inflict
									2 Bleedings (R 1).
									<br />
								</p>
							),
						},
						{
							intention: DEFENSIVE,
							values: [3, 4, 5, 6],
							content: (
								<p>
									Move 2.
									<br />
									Inflict 3 Bleedings (R 1).
									<br />
								</p>
							),
						},
						{
							intention: SPECIAL,
							values: ['A', 'B', 'C', 'D'],
							content: <p>Attack 4 & Inflict 2 Bleedings (R 4-1).</p>,
						},
					],
				},
				{
					name: 'Tank',
					lv: MINOR,
					imageSrc: '/images/ks/monster-tank.png',
					hp: 20,
					role: 'Defender',
					firstIntention: OFFENSIVE,
					actions: [
						{
							intention: OFFENSIVE,
							values: [0],
							content: <p>Another closest monster gains Invisible.</p>,
						},
						{
							intention: OFFENSIVE,
							values: [1, 2, 3, 4, 5, 6],
							content: (
								<p>
									Attack 3 & Push 1 (R 1). Move 1.
									<br />
									Another closest monster gains Invisible.
								</p>
							),
						},
						{
							intention: DEFENSIVE,
							values: [0],
							content: <p>Another closest monster gains Invisible.</p>,
						},
						{
							intention: DEFENSIVE,
							values: [1, 2, 3, 4, 5, 6],
							content: (
								<p>
									Move 2. Block 8 (Self).
									<br />
									Another closest monster gains Invisible.
								</p>
							),
						},
						{
							intention: SPECIAL,
							values: ['A', 'B', 'C', 'D'],
							content: <p>Each other monsters gain Invisible.</p>,
						},
					],
				},
				{
					name: 'Tank',
					lv: NORMAL,
					imageSrc: '/images/ks/monster-tank.png',
					hp: 25,
					role: 'Defender',
					firstIntention: OFFENSIVE,
					actions: [
						{
							intention: OFFENSIVE,
							values: [0],
							content: <p>Another closest monster gains Invisible.</p>,
						},
						{
							intention: OFFENSIVE,
							values: [1, 2, 3, 4, 5, 6],
							content: (
								<p>
									Attack 3 & Push 1 (R 1). Move 1.
									<br />
									Another closest monster gains Invisible.
								</p>
							),
						},
						{
							intention: DEFENSIVE,
							values: [0],
							content: <p>Another closest monster gains Invisible.</p>,
						},
						{
							intention: DEFENSIVE,
							values: [1, 2, 3],
							content: (
								<p>
									Move 2. Block 8 (Self).
									<br />
									Another closest monster gains Invisible.
								</p>
							),
						},
						{
							intention: DEFENSIVE,
							values: [4, 5, 6],
							content: (
								<p>
									Move 2. Heal 5 (Self).
									<br />
									Another closest monster gains Invisible.
								</p>
							),
						},
						{
							intention: SPECIAL,
							values: ['A', 'B', 'C', 'D'],
							content: <p>Each other monsters gain Invisible.</p>,
						},
					],
				},
				{
					name: 'Tank',
					lv: ADVANCED,
					imageSrc: '/images/ks/monster-tank.png',
					hp: 25,
					role: 'Defender',
					firstIntention: OFFENSIVE,
					actions: [
						{
							intention: OFFENSIVE,
							values: [0],
							content: <p>Another closest monster gains Invisible.</p>,
						},
						{
							intention: OFFENSIVE,
							values: [1, 2, 3, 4],
							content: (
								<p>
									Attack 3 & Push 1 (R 1). Move 1.
									<br />
									If any monster died this combat: Repeat above actions.
									<br />
									Another closest monster gains Invisible.
								</p>
							),
						},
						{
							intention: OFFENSIVE,
							values: [5, 6],
							content: (
								<p>
									Pull 2 (R 3-2). Attack 2 (R 1).
									<br />
									Another closest monster gains Invisible.
								</p>
							),
						},
						{
							intention: DEFENSIVE,
							values: [0],
							content: <p>Another closest monster gains Invisible.</p>,
						},
						{
							intention: DEFENSIVE,
							values: [1, 2, 3],
							content: (
								<p>
									Move 2. Block 8 (Self).
									<br />
									Another closest monster gains Invisible.
								</p>
							),
						},
						{
							intention: DEFENSIVE,
							values: [4, 5, 6],
							content: (
								<p>
									Move 2. Heal 5 (Self).
									<br />
									Another closest monster gains Invisible.
								</p>
							),
						},
						{
							intention: SPECIAL,
							values: ['A', 'B', 'C', 'D'],
							content: <p>Each other monsters gain Invisible.</p>,
						},
					],
				},
				{
					name: 'Tank',
					lv: ELITE,
					imageSrc: '/images/ks/monster-tank.png',
					hp: 30,
					role: 'Defender',
					firstIntention: OFFENSIVE,
					actions: [
						{
							intention: OFFENSIVE,
							values: [0],
							content: <p>Another closest monster gains Invisible.</p>,
						},
						{
							intention: OFFENSIVE,
							values: [1, 2, 3, 4],
							content: (
								<p>
									Attack 4 & Push 1 (R 1). Move 1.
									<br />
									If any monster died this combat: Repeat above actions.
									<br />
									Another closest monster gains Invisible.
								</p>
							),
						},
						{
							intention: OFFENSIVE,
							values: [5, 6],
							content: (
								<p>
									Pull 3 (R 4-2). Attack 3 (R 1).
									<br />
									Another closest monster gains Invisible.
								</p>
							),
						},
						{
							intention: DEFENSIVE,
							values: [0],
							content: <p>Another closest monster gains Invisible.</p>,
						},
						{
							intention: DEFENSIVE,
							values: [1, 2, 3],
							content: (
								<p>
									Move 2. Block 10 (Self).
									<br />
									Another closest monster gains Invisible.
								</p>
							),
						},
						{
							intention: DEFENSIVE,
							values: [4, 5, 6],
							content: (
								<p>
									Move 2. Heal 7 (Self).
									<br />
									Another closest monster gains Invisible.
								</p>
							),
						},
						{
							intention: SPECIAL,
							values: ['A', 'B', 'C', 'D'],
							content: <p>Each other monsters gain Invisible.</p>,
						},
					],
				},
				{
					name: 'Bomber',
					lv: MINOR,
					imageSrc: '/images/ks/monster-bomber.png',
					hp: 18,
					role: 'Controller',
					firstIntention: OFFENSIVE,
					actions: [
						{
							intention: OFFENSIVE,
							values: [0],
							content: (
								<p>
									Summon a{' '}
									<span className='text-red-900 font-bold'>Bomb(trap)</span> on
									range 0.
								</p>
							),
						},
						{
							intention: OFFENSIVE,
							values: [1, 2, 3, 4, 5, 6],
							content: (
								<p>
									Summon a{' '}
									<span className='text-red-900 font-bold'>Bomb(trap)</span> on
									range X (X = intention value).
									<br />
								</p>
							),
						},
						{
							intention: DEFENSIVE,
							values: [0],
							content: (
								<p>
									Summon a{' '}
									<span className='text-red-900 font-bold'>Bomb(trap)</span> on
									range 0.
								</p>
							),
						},
						{
							intention: DEFENSIVE,
							values: [1, 2, 3, 4, 5, 6],
							content: (
								<p>
									Summon a{' '}
									<span className='text-red-900 font-bold'>Bomb(trap)</span> on
									the space of closest player.
								</p>
							),
						},
						{
							intention: SPECIAL,
							values: ['A', 'B', 'C', 'D'],
							content: (
								<p>
									Summon{' '}
									<span className='text-red-900 font-bold'>Bomb(trap)</span> on
									range 1, range 4 and range 7.
								</p>
							),
						},
					],
				},
				{
					name: 'Bomber',
					lv: NORMAL,
					imageSrc: '/images/ks/monster-bomber.png',
					hp: 20,
					role: 'Controller',
					firstIntention: OFFENSIVE,
					actions: [
						{
							intention: OFFENSIVE,
							values: [0],
							content: (
								<p>
									Summon a{' '}
									<span className='text-red-900 font-bold'>Bomb(trap)</span> on
									range 0.
								</p>
							),
						},
						{
							intention: OFFENSIVE,
							values: [1, 2, 3, 4, 5, 6],
							content: (
								<p>
									Summon a{' '}
									<span className='text-red-900 font-bold'>Bomb(trap)</span> on
									range X (X = intention value).
									<br />
								</p>
							),
						},
						{
							intention: DEFENSIVE,
							values: [0],
							content: (
								<p>
									Summon a{' '}
									<span className='text-red-900 font-bold'>Bomb(trap)</span> on
									range 0.
								</p>
							),
						},
						{
							intention: DEFENSIVE,
							values: [1, 2, 3, 4],
							content: (
								<p>
									Summon a{' '}
									<span className='text-red-900 font-bold'>Bomb(trap)</span> on
									the space of closest player.
								</p>
							),
						},
						{
							intention: DEFENSIVE,
							values: [5, 6],
							content: (
								<p>
									Summon a{' '}
									<span className='text-red-900 font-bold'>Bomb(trap)</span> on
									the space of closest player.
									<br />
									Inflict 1 Immobolize to that player.
								</p>
							),
						},
						{
							intention: SPECIAL,
							values: ['A', 'B', 'C', 'D'],
							content: (
								<p>
									Summon{' '}
									<span className='text-red-900 font-bold'>Bomb(trap)</span> on
									range 1, range 4 and range 7.
								</p>
							),
						},
					],
				},
				{
					name: 'Bomber',
					lv: ADVANCED,
					imageSrc: '/images/ks/monster-bomber.png',
					hp: 20,
					role: 'Controller',
					firstIntention: OFFENSIVE,
					actions: [
						{
							intention: OFFENSIVE,
							values: [0],
							content: (
								<p>
									Summon a{' '}
									<span className='text-red-900 font-bold'>Bomb(trap)</span> on
									range 0.
								</p>
							),
						},
						{
							intention: OFFENSIVE,
							values: [1, 2, 3, 4, 5, 6],
							content: (
								<p>
									Summon a{' '}
									<span className='text-red-900 font-bold'>Bomb(trap)</span> on
									range X (X = intention value).
									<br />
								</p>
							),
						},
						{
							intention: DEFENSIVE,
							values: [0],
							content: (
								<p>
									Summon a{' '}
									<span className='text-red-900 font-bold'>Bomb(trap)</span> on
									range 0.
								</p>
							),
						},
						{
							intention: DEFENSIVE,
							values: [1, 2, 3, 4],
							content: (
								<p>
									Summon a{' '}
									<span className='text-red-900 font-bold'>Bomb(trap)</span> on
									the space of closest player.
								</p>
							),
						},
						{
							intention: DEFENSIVE,
							values: [5, 6],
							content: (
								<p>
									Summon a{' '}
									<span className='text-red-900 font-bold'>Bomb(trap)</span> on
									the space of closest player.
									<br />
									Inflict 1 Immobolize to that player.
								</p>
							),
						},
						{
							intention: SPECIAL,
							values: ['A', 'B', 'C', 'D'],
							content: (
								<p>
									Summon{' '}
									<span className='text-red-900 font-bold'>Bomb(trap)</span> on
									range 1, range 4 and range 7.
									<br /> Those{' '}
									<span className='text-red-900 font-bold'>
										Bomb(trap)
									</span>{' '}
									perform Move 1.
								</p>
							),
						},
					],
				},
				{
					name: 'Bomber',
					lv: ELITE,
					imageSrc: '/images/ks/monster-bomber.png',
					hp: 25,
					role: 'Controller',
					firstIntention: OFFENSIVE,
					actions: [
						{
							intention: OFFENSIVE,
							values: [0],
							content: (
								<p>
									Summon a{' '}
									<span className='text-red-900 font-bold'>Bomb(trap)</span> on
									range 0.
								</p>
							),
						},
						{
							intention: OFFENSIVE,
							values: [1, 2, 3, 4, 5, 6],
							content: (
								<p>
									Summon{' '}
									<span className='text-red-900 font-bold'>Bomb(trap)</span> on
									range X-1 and range X+1 (X = intention value).
									<br />
								</p>
							),
						},
						{
							intention: DEFENSIVE,
							values: [0],
							content: (
								<p>
									Summon a{' '}
									<span className='text-red-900 font-bold'>Bomb(trap)</span> on
									range 0.
								</p>
							),
						},
						{
							intention: DEFENSIVE,
							values: [1, 2],
							content: (
								<p>
									Summon a{' '}
									<span className='text-red-900 font-bold'>Bomb(trap)</span> on
									the space of closest player. Inflict 1 Immobolize to that
									player.
								</p>
							),
						},
						{
							intention: DEFENSIVE,
							values: [3, 4],
							content: (
								<p>
									Summon a{' '}
									<span className='text-red-900 font-bold'>Bomb(trap)</span> on
									the space of 2nd closest player. Inflict 1 Immobolize to that
									player.
								</p>
							),
						},
						{
							intention: DEFENSIVE,
							values: [5, 6],
							content: (
								<p>
									Summon a{' '}
									<span className='text-red-900 font-bold'>Bomb(trap)</span> on
									the space of 3rd closest player. Inflict 1 Immobolize to that
									player.
								</p>
							),
						},
						{
							intention: SPECIAL,
							values: ['A', 'B', 'C', 'D'],
							content: (
								<p>
									For each player, summon a{' '}
									<span className='text-red-900 font-bold'>Bomb(trap)</span> on
									its space.
								</p>
							),
						},
					],
				},
				{
					name: 'Archer',
					lv: MINOR,
					imageSrc: '/images/ks/monster-archer.png',
					hp: 18,
					role: 'Sniper',
					firstIntention: DEFENSIVE,
					actions: [
						{
							intention: OFFENSIVE,
							values: [0],
							content: <p>Attack 1 & Inflict 1 Poison (R 1). Back 1.</p>,
						},
						{
							intention: OFFENSIVE,
							values: [1, 2, 3, 4, 5, 6],
							content: (
								<p>
									Attack 3 & Inflict 1 Poison (R 5-3).
									<br />
									Attack 1 & Inflict 1 Poison (R 1).
									<br />
									Back 1.
								</p>
							),
						},
						{
							intention: DEFENSIVE,
							values: [0],
							content: <p>Block 5 (Self). Move 1.</p>,
						},
						{
							intention: DEFENSIVE,
							values: [1, 2, 3, 4, 5, 6],
							content: (
								<p>
									Attack 3 & Inflict 1 Poison (R 1-3).
									<br />
									Block 5 (Self).
									<br />
									Move 1.
								</p>
							),
						},
						{
							intention: SPECIAL,
							values: ['A'],
							content: <p>Attack 4 & Inflict 1 Poison (R 2).</p>,
						},
						{
							intention: SPECIAL,
							values: ['B'],
							content: <p>Attack 4 & Inflict 1 Poison (R 3).</p>,
						},
						{
							intention: SPECIAL,
							values: ['C'],
							content: <p>Attack 4 & Inflict 1 Poison (R 4).</p>,
						},
						{
							intention: SPECIAL,
							values: ['D'],
							content: <p>Attack 4 & Inflict 1 Poison (R 5).</p>,
						},
					],
				},
				{
					name: 'Archer',
					lv: NORMAL,
					imageSrc: '/images/ks/monster-archer.png',
					hp: 20,
					role: 'Sniper',
					firstIntention: DEFENSIVE,
					actions: [
						{
							intention: OFFENSIVE,
							values: [0],
							content: <p>Attack 1 & Inflict 1 Poison (R 1). Back 1.</p>,
						},
						{
							intention: OFFENSIVE,
							values: [1, 2, 3, 4, 5, 6],
							content: (
								<p>
									Attack 3 & Inflict 1 Poison (R 5-3).
									<br />
									Attack 1 & Inflict 1 Poison (R 1).
									<br />
									Back 1.
								</p>
							),
						},
						{
							intention: DEFENSIVE,
							values: [0],
							content: <p>Block 5. Move 1.</p>,
						},
						{
							intention: DEFENSIVE,
							values: [1, 2, 3, 4, 5],
							content: (
								<p>
									Attack 3 & Inflict 1 Poison (R 1-3).
									<br />
									Block 5.
									<br />
									Move 1.
								</p>
							),
						},
						{
							intention: DEFENSIVE,
							values: [6],
							content: (
								<p>
									Attack 3 & Inflict 1 Poison (R 1-3). Gain Invisible (Self).
								</p>
							),
						},
						{
							intention: SPECIAL,
							values: ['A'],
							content: <p>Attack 6 & Inflict 1 Poison (R 2).</p>,
						},
						{
							intention: SPECIAL,
							values: ['B'],
							content: <p>Attack 6 & Inflict 1 Poison (R 3).</p>,
						},
						{
							intention: SPECIAL,
							values: ['C'],
							content: <p>Attack 6 & Inflict 1 Poison (R 4).</p>,
						},
						{
							intention: SPECIAL,
							values: ['D'],
							content: <p>Attack 6 & Inflict 1 Poison (R 5).</p>,
						},
					],
				},
				{
					name: 'Archer',
					lv: ADVANCED,
					imageSrc: '/images/ks/monster-archer.png',
					hp: 20,
					role: 'Sniper',
					firstIntention: DEFENSIVE,
					actions: [
						{
							intention: OFFENSIVE,
							values: [0],
							content: <p>Attack 1 & Inflict 1 Poison (R 1). Back 1.</p>,
						},
						{
							intention: OFFENSIVE,
							values: [1, 2, 3, 4, 5],
							content: (
								<p>
									Attack 3 & Inflict 1 Poison (R 5-3).
									<br />
									Attack 1 & Inflict 1 Poison (R 1).
									<br />
									Back 1.
								</p>
							),
						},
						{
							intention: OFFENSIVE,
							values: [6],
							content: <p>Attack 6 & Inflict 1 Poison (R 5-3).</p>,
						},
						{
							intention: DEFENSIVE,
							values: [0],
							content: <p>Block 6 (Self). Move 1.</p>,
						},
						{
							intention: DEFENSIVE,
							values: [1, 2, 3, 4, 5],
							content: (
								<p>
									Attack 3 & Inflict 1 Poison (R 1-3). Block 5 (Self).
									<br />
									Block 6 (Self). <br />
									Move 1.
								</p>
							),
						},
						{
							intention: DEFENSIVE,
							values: [6],
							content: (
								<p>
									Attack 3 & Inflict 1 Poison (R 1-3). Gain Invisible (Self).
								</p>
							),
						},
						{
							intention: SPECIAL,
							values: ['A'],
							content: <p>Attack 6 & Inflict 1 Poison (R 2).</p>,
						},
						{
							intention: SPECIAL,
							values: ['B'],
							content: <p>Attack 6 & Inflict 1 Poison (R 3).</p>,
						},
						{
							intention: SPECIAL,
							values: ['C'],
							content: <p>Attack 6 & Inflict 1 Poison (R 4).</p>,
						},
						{
							intention: SPECIAL,
							values: ['D'],
							content: <p>Attack 6 & Inflict 1 Poison (R 5).</p>,
						},
					],
				},
				{
					name: 'Archer',
					lv: ELITE,
					imageSrc: '/images/ks/monster-archer.png',
					hp: 25,
					role: 'Sniper',
					firstIntention: DEFENSIVE,
					actions: [
						{
							intention: OFFENSIVE,
							values: [0],
							content: <p>Attack 1 & Inflict 2 Poison (R 1). Back 1.</p>,
						},
						{
							intention: OFFENSIVE,
							values: [1, 2, 3, 4, 5],
							content: (
								<p>
									Attack 3 & Inflict 2 Poison (R 5-3).
									<br />
									Attack 1 & Inflict 2 Poison (R 1).
								</p>
							),
						},
						{
							intention: OFFENSIVE,
							values: [6],
							content: <p>Attack 6 & Inflict 2 Poison (R 5-3).</p>,
						},
						{
							intention: DEFENSIVE,
							values: [0],
							content: <p>Block 8 (Self). Move 1.</p>,
						},
						{
							intention: DEFENSIVE,
							values: [1, 2, 3, 4, 5],
							content: (
								<p>
									Attack 3 & Inflict 2 Poison (R 1-3).
									<br />
									Block 8 (Self).
								</p>
							),
						},
						{
							intention: DEFENSIVE,
							values: [6],
							content: (
								<p>
									Attack 3 & Inflict 2 Poison (R 1-3). Gain Invisible (Self).
								</p>
							),
						},
						{
							intention: SPECIAL,
							values: ['A'],
							content: <p>Attack 6 & Inflict 2 Poison (R 2).</p>,
						},
						{
							intention: SPECIAL,
							values: ['B'],
							content: <p>Attack 6 & Inflict 2 Poison (R 3).</p>,
						},
						{
							intention: SPECIAL,
							values: ['C'],
							content: <p>Attack 6 & Inflict 2 Poison (R 4).</p>,
						},
						{
							intention: SPECIAL,
							values: ['D'],
							content: <p>Attack 6 & Inflict 2 Poison (R 5).</p>,
						},
					],
				},
				{
					name: 'Doctor',
					lv: MINOR,
					imageSrc: '/images/ks/monster-doctor.png',
					hp: 18,
					role: 'Supporter',
					firstIntention: DEFENSIVE,
					actions: [
						{
							intention: OFFENSIVE,
							values: [0],
							content: <p>Exhaust 1 card (R 1-3).</p>,
						},
						{
							intention: OFFENSIVE,
							values: [1, 2, 3, 4, 5, 6],
							content: <p>Exhaust 1 card (R 1-8 Brust, 2 players).</p>,
						},
						{
							intention: DEFENSIVE,
							values: [0],
							content: (
								<p>
									Heal 3 & Cleanse all & inflict 1 Protection (R 1-3, monster).
								</p>
							),
						},
						{
							intention: DEFENSIVE,
							values: [1, 2, 3, 4, 5, 6],
							content: (
								<p>
									Heal 3 & Cleanse all & inflict 1 Protection (R 1-8 Brust, 2
									monsters).
									<br />
								</p>
							),
						},
						{
							intention: SPECIAL,
							values: ['A', 'B', 'C', 'D'],
							content: (
								<p>
									Each player lose 1 HP for every 2 exhausted cards in their
									zones.
									<br />
								</p>
							),
						},
					],
				},
				{
					name: 'Doctor',
					lv: NORMAL,
					imageSrc: '/images/ks/monster-doctor.png',
					hp: 20,
					role: 'Supporter',
					firstIntention: DEFENSIVE,
					actions: [
						{
							intention: OFFENSIVE,
							values: [0],
							content: <p>Exhaust 2 cards (R 1-3).</p>,
						},
						{
							intention: OFFENSIVE,
							values: [1, 2, 3, 4, 5, 6],
							content: <p>Exhaust 2 cards (R 1-8 Brust, 2 players).</p>,
						},
						{
							intention: DEFENSIVE,
							values: [0],
							content: (
								<p>
									Heal 3 & Cleanse all & inflict 1 Protection (R 1-3, monster).
								</p>
							),
						},
						{
							intention: DEFENSIVE,
							values: [1, 2, 3, 4],
							content: (
								<p>
									Heal 3 & Cleanse all & inflict 1 Protection (R 1-8 Brust, 2
									monsters).
								</p>
							),
						},
						{
							intention: DEFENSIVE,
							values: [5, 6],
							content: (
								<p>
									Heal 3 & Cleanse all & inflict 1 Protection (R 1-8 Brust, all
									monsters).
								</p>
							),
						},
						{
							intention: SPECIAL,
							values: ['A', 'B', 'C', 'D'],
							content: (
								<p>
									Each player lose 1 HP for every 2 exhausted cards in their
									zones.
									<br />
								</p>
							),
						},
					],
				},
				{
					name: 'Doctor',
					lv: ADVANCED,
					imageSrc: '/images/ks/monster-doctor.png',
					hp: 20,
					role: 'Supporter',
					firstIntention: DEFENSIVE,
					actions: [
						{
							intention: OFFENSIVE,
							values: [0],
							content: <p>Exhaust 2 cards (R 1-3).</p>,
						},
						{
							intention: OFFENSIVE,
							values: [1, 2],
							content: (
								<p>
									Exhaust all cards in left columns (R 1-8 Brust, 2 players).
								</p>
							),
						},
						{
							intention: OFFENSIVE,
							values: [3, 4],
							content: (
								<p>
									Exhaust all cards in right columns (R 1-8 Brust, 2 players).
								</p>
							),
						},
						{
							intention: OFFENSIVE,
							values: [5, 6],
							content: (
								<p>
									Exhaust all cards in center columns (R 1-8 Brust, 2 players).
								</p>
							),
						},
						{
							intention: DEFENSIVE,
							values: [0],
							content: (
								<p>
									Heal 5 & Cleanse all & inflict 1 Protection (R 1-3, monster).
								</p>
							),
						},
						{
							intention: DEFENSIVE,
							values: [1, 2, 3, 4],
							content: (
								<p>
									Heal 5 & Cleanse all & inflict 1 Protection (R 1-8 Brust, 2
									monsters).
								</p>
							),
						},
						{
							intention: DEFENSIVE,
							values: [5, 6],
							content: (
								<p>
									Heal 5 & Cleanse all & inflict 1 Protection (R 1-8 Brust, all
									monsters).
								</p>
							),
						},
						{
							intention: SPECIAL,
							values: ['A', 'B', 'C', 'D'],
							content: (
								<p>
									Each player lose 1 HP for every 2 exhausted cards in their
									zones.
									<br />
								</p>
							),
						},
					],
				},
				{
					name: 'Doctor',
					lv: ELITE,
					imageSrc: '/images/ks/monster-doctor.png',
					hp: 25,
					role: 'Supporter',
					firstIntention: DEFENSIVE,
					actions: [
						{
							intention: OFFENSIVE,
							values: [0],
							content: <p>Exhaust 3 cards (R 1-3).</p>,
						},
						{
							intention: OFFENSIVE,
							values: [1, 2],
							content: (
								<p>
									Exhaust all cards in left columns (R 1-8 Brust, 2 players).
								</p>
							),
						},
						{
							intention: OFFENSIVE,
							values: [3, 4],
							content: (
								<p>
									Exhaust all cards in right columns (R 1-8 Brust, 2 players).
								</p>
							),
						},
						{
							intention: OFFENSIVE,
							values: [5, 6],
							content: (
								<p>
									Exhaust all cards in center columns (R 1-8 Brust, 2 players).
								</p>
							),
						},
						{
							intention: DEFENSIVE,
							values: [0],
							content: <p>Heal 5 (R 1-3, monster).</p>,
						},
						{
							intention: DEFENSIVE,
							values: [1, 2, 3, 4],
							content: (
								<p>
									Heal 5 & Cleanse all & inflict 1 Protection (R 1-8 Brust, 2
									monsters).
								</p>
							),
						},
						{
							intention: DEFENSIVE,
							values: [5, 6],
							content: (
								<p>
									Heal 5 & Cleanse all & inflict 1 Protection (R 1-8 Brust, all
									monsters).
								</p>
							),
						},
						{
							intention: SPECIAL,
							values: ['A', 'B', 'C', 'D'],
							content: (
								<p>
									Each player lose 1 HP for every 2 exhausted cards in their
									zones.
									<br />
								</p>
							),
						},
					],
				},
				{
					name: 'Flyer',
					lv: MINOR,
					imageSrc: '/images/ks/monster-flyer.png',
					hp: 20,
					role: 'Lurker',
					firstIntention: DEFENSIVE,
					actions: [
						{
							intention: OFFENSIVE,
							values: [0],
							content: <p>Piercing Attack 2 (R 0).</p>,
						},
						{
							intention: OFFENSIVE,
							values: [1, 2, 3, 4, 5, 6],
							content: (
								<p>
									Piercing Attack 2 (R 0).
									<br />
									Attack 2 (R 1). Attack 2 (R 1).
									<br />
									If figure exists: Jump 4 until fartest reachable player.
								</p>
							),
						},
						{
							intention: DEFENSIVE,
							values: [0],
							content: <p>Piercing Attack 2 (R 0).</p>,
						},
						{
							intention: DEFENSIVE,
							values: [1, 2, 3, 4, 5, 6],
							content: (
								<p>
									Piercing Attack 2 (R 0).
									<br />
									If figure exists: Jump 4 until fartest reachable player.
									<br />
									Inflict 1 Immobolize to most green card (R 0-1).
								</p>
							),
						},
						{
							intention: SPECIAL,
							values: ['A', 'B', 'C', 'D'],
							content: (
								<p>
									Place a monster token onto closest player, then set aside
									flyer&apos;s figure. Flyer is on the same space of marker.
									<br />
									If flyer is pushed/pulled or marked player dies, remove the
									marker and return its figure to appropiate space.
								</p>
							),
						},
					],
				},
				{
					name: 'Flyer',
					lv: NORMAL,
					imageSrc: '/images/ks/monster-flyer.png',
					hp: 25,
					role: 'Lurker',
					firstIntention: DEFENSIVE,
					actions: [
						{
							intention: OFFENSIVE,
							values: [0],
							content: <p>Piercing Attack 3 (R 0).</p>,
						},
						{
							intention: OFFENSIVE,
							values: [1, 2, 3, 4, 5, 6],
							content: (
								<p>
									Piercing Attack 3 (R 0).
									<br />
									Attack 3 (R 1). Attack 3 (R 1).
									<br />
									If figure exists: Jump 4 until fartest reachable player.
								</p>
							),
						},
						{
							intention: DEFENSIVE,
							values: [0],
							content: <p>Piercing Attack 3 (R 0).</p>,
						},
						{
							intention: DEFENSIVE,
							values: [1, 2, 3],
							content: (
								<p>
									Piercing Attack 3 (R 0).
									<br />
									If figure exists: Jump 4 until fartest reachable player.
									<br />
									Inflict 1 Immobolize to most green card (R 0-1).
								</p>
							),
						},
						{
							intention: DEFENSIVE,
							values: [4, 5, 6],
							content: (
								<p>
									Piercing Attack 3 (R 0).
									<br />
									If figure exists: Jump 4 until fartest reachable player.
									<br />
									Inflict 1 Immobolize to most green card (Brust R 0-2).
								</p>
							),
						},
						{
							intention: SPECIAL,
							values: ['A', 'B', 'C', 'D'],
							content: (
								<p>
									Place a monster token onto closest player, then set aside
									flyer&apos;s figure. Flyer is on the same space of marker.
									<br />
									If flyer is pushed/pulled or marked player dies, remove the
									marker and return its figure to appropiate space.
								</p>
							),
						},
					],
				},
				{
					name: 'Flyer',
					lv: ADVANCED,
					imageSrc: '/images/ks/monster-flyer.png',
					hp: 25,
					role: 'Lurker',
					firstIntention: DEFENSIVE,
					actions: [
						{
							intention: OFFENSIVE,
							values: [0],
							content: <p>Piercing Attack 3 (R 0).</p>,
						},
						{
							intention: OFFENSIVE,
							values: [1, 2, 3],
							content: (
								<p>
									Piercing Attack 3 (R 0).
									<br />
									Attack 3 (R 1). Attack 3 (R 1).
									<br />
									If figure exists: Jump 4 until fartest reachable player.
								</p>
							),
						},
						{
							intention: OFFENSIVE,
							values: [4, 5, 6],
							content: (
								<p>
									Piercing Attack 3 (R 0).
									<br />
									Attack 2 (Brust R 0-2).
									<br />
									If figure exists: Jump 4 until fartest reachable player.
								</p>
							),
						},
						{
							intention: DEFENSIVE,
							values: [0],
							content: <p>Piercing Attack 3 (R 0).</p>,
						},
						{
							intention: DEFENSIVE,
							values: [1, 2, 3],
							content: (
								<p>
									Piercing Attack 3 (R 0).
									<br />
									If figure exists: Jump 4 until fartest reachable player.
									<br />
									Inflict 2 Immobolize to most green card (R 0-1)
								</p>
							),
						},
						{
							intention: DEFENSIVE,
							values: [4, 5, 6],
							content: (
								<p>
									Piercing Attack 3 (R 0).
									<br />
									If figure exists: Jump 4 until fartest reachable player.
									<br />
									Inflict 1 Immobolize to most green card (Brust R 0-2).
								</p>
							),
						},
						{
							intention: SPECIAL,
							values: ['A', 'B', 'C', 'D'],
							content: (
								<p>
									Place a monster token onto closest player, then set aside
									flyer&apos;s figure. Flyer is on the same space of marker.
									<br />
									If flyer is pushed/pulled or marked player dies, remove the
									marker and return its figure to appropiate space.
								</p>
							),
						},
					],
				},
				{
					name: 'Flyer',
					lv: ELITE,
					imageSrc: '/images/ks/monster-flyer.png',
					hp: 30,
					role: 'Lurker',
					firstIntention: SPECIAL,
					actions: [
						{
							intention: OFFENSIVE,
							values: [0],
							content: <p>Piercing Attack 4 (R 0).</p>,
						},
						{
							intention: OFFENSIVE,
							values: [1, 2, 3],
							content: (
								<p>
									Piercing Attack 4 (R 0).
									<br />
									Attack 4 (R 1). Attack 4 (R 1).
									<br />
									If figure exists: Jump 4 until fartest reachable player.
								</p>
							),
						},
						{
							intention: OFFENSIVE,
							values: [4, 5, 6],
							content: (
								<p>
									Piercing Attack 4 (R 0).
									<br />
									Attack 3 (Brust R 0-2).
									<br />
									If figure exists: Jump 4 until fartest reachable player.
								</p>
							),
						},
						{
							intention: DEFENSIVE,
							values: [0],
							content: <p>Piercing Attack 4 (R 0).</p>,
						},
						{
							intention: DEFENSIVE,
							values: [1, 2, 3],
							content: (
								<p>
									Piercing Attack 4 (R 0).
									<br />
									If figure exists: Jump 4 until fartest reachable player.
									<br />
									Inflict 2 Immobolize to most green card (R 0-1)
								</p>
							),
						},
						{
							intention: DEFENSIVE,
							values: [4, 5, 6],
							content: (
								<p>
									Piercing Attack 4 (R 0).
									<br />
									If figure exists: Jump 4 until fartest reachable player.
									<br />
									Inflict 1 Immobolize to most green card (Brust R 0-2).
								</p>
							),
						},
						{
							intention: SPECIAL,
							values: ['A', 'B', 'C', 'D'],
							content: (
								<p>
									Place a monster token onto closest player, then set aside
									flyer&apos;s figure. Flyer is on the same space of marker.
									<br />
									<span className='text-red-700 font-bold'>
										ONLY If marked player dies
									</span>
									, remove the marker and return its figure to appropiate space.
								</p>
							),
						},
					],
				},
				{
					name: 'Madman',
					lv: MINOR,
					imageSrc: '/images/ks/monster-madman.png',
					hp: '50',
					role: 'Boss',
					firstIntention: OFFENSIVE,
					actions: [
						{
							intention: OFFENSIVE,
							values: [0],
							content: <p>Inflict 1 Rage and 1 Protection (Self).</p>,
						},
						{
							intention: OFFENSIVE,
							values: [1, 2, 3, 4, 5, 6],
							content: (
								<p>
									Attack 2 (R 1). Attack 2 (R 1). Move 1. <br />
									Attack 2 (R 1). Attack 2 (R 1). Move 1. <br />
									if madman does no damage to HP this turn, Inflict 1 Rage and 1
									Protection (Self).
								</p>
							),
						},
						{
							intention: DEFENSIVE,
							values: [0],
							content: <p>Inflict 1 Rage and 1 Protection (Self).</p>,
						},
						{
							intention: DEFENSIVE,
							values: [1, 2, 3, 4, 5, 6],
							content: (
								<p>
									Inflict 1 Rage and 1 Protection (Self & all monsters).
									<br /> Block 10.
								</p>
							),
						},
						{
							intention: SPECIAL,
							values: ['A', 'B', 'C', 'D'],
							content: (
								<p>
									Attack 1 (Brust AR 1-2). Attack 1 (Brust AR 1-2). <br />
									Attack 1 (Brust AR 1-2). Attack 1 (Brust AR 1-2). <br />
									if madman does no damage to HP this turn, Inflict 1 Rage and 1
									Protection (Self).
								</p>
							),
						},
					],
				},
				{
					name: 'Madman',
					lv: NORMAL,
					imageSrc: '/images/ks/monster-madman.png',
					hp: '60',
					role: 'Boss',
					firstIntention: OFFENSIVE,
					actions: [
						{
							intention: OFFENSIVE,
							values: [0],
							content: <p>Inflict 1 Rage and 1 Protection (Self).</p>,
						},
						{
							intention: OFFENSIVE,
							values: [1, 2, 3, 4, 5, 6],
							content: (
								<p>
									Attack 2 (R 1). Attack 2 (R 1). Move 1. <br />
									Attack 2 (R 1). Attack 2 (R 1). Move 1. <br />
									if madman does no damage to HP this turn, Inflict 1 Rage and 1
									Protection (Self).
								</p>
							),
						},
						{
							intention: DEFENSIVE,
							values: [0],
							content: <p>Inflict 1 Rage and 1 Protection (Self).</p>,
						},
						{
							intention: DEFENSIVE,
							values: [1, 2, 3, 4],
							content: (
								<p>
									Block 10.
									<br />
									Inflict 1 Rage and 1 Protection (Self & all monsters).
								</p>
							),
						},
						{
							intention: DEFENSIVE,
							values: [5, 6],
							content: (
								<p>
									Attack 1 (Brust AR 1-2). Attack 1 (Brust AR 1-2).
									<br />
									Inflict 1 Rage and 1 Protection (Self & all monsters).
									<br />
								</p>
							),
						},
						{
							intention: SPECIAL,
							values: ['A', 'B', 'C', 'D'],
							content: (
								<p>
									Attack 1 (Brust AR 1-2). Attack 1 (Brust AR 1-2). <br />
									Attack 1 (Brust AR 1-2). Attack 1 (Brust AR 1-2). <br />
									if madman does no damage to HP this turn, Inflict 1 Rage and 1
									Protection (Self).
								</p>
							),
						},
					],
				},
				{
					name: 'Madman',
					lv: ADVANCED,
					imageSrc: '/images/ks/monster-madman.png',
					hp: '70',
					role: 'Boss',
					firstIntention: OFFENSIVE,
					actions: [
						{
							intention: OFFENSIVE,
							values: [0],
							content: <p>Inflict 2 Rage and 1 Protection (Self).</p>,
						},
						{
							intention: OFFENSIVE,
							values: [1, 2, 3, 4],
							content: (
								<p>
									Attack 2 (R 1). Attack 2 (R 1). Move 1. <br />
									Attack 2 (R 1). Attack 2 (R 1). Move 1. <br />
									if madman does no damage to HP this turn, Inflict 2 Rage and 1
									Protection (Self).
								</p>
							),
						},
						{
							intention: OFFENSIVE,
							values: [5, 6],
							content: (
								<p>
									Jump 3 towards fartest player.
									<br />
									Attack 2 (R 1-2). Attack 2 (R 4-3).
								</p>
							),
						},
						{
							intention: DEFENSIVE,
							values: [0],
							content: <p>Inflict 2 Rage and 1 Protection (Self).</p>,
						},
						{
							intention: DEFENSIVE,
							values: [1, 2, 3, 4],
							content: (
								<p>
									Block 10.
									<br />
									Inflict 2 Rage and 1 Protection (Self & all monsters).
								</p>
							),
						},
						{
							intention: DEFENSIVE,
							values: [5, 6],
							content: (
								<p>
									Attack 1 (Brust AR 1-2). Attack 1 (Brust AR 1-2).
									<br />
									Inflict 2 Rage and 1 Protection (Self & all monsters).
									<br />
								</p>
							),
						},
						{
							intention: SPECIAL,
							values: ['A', 'B', 'C', 'D'],
							content: (
								<p>
									Attack 1 (Brust AR 1-2). Attack 1 (Brust AR 1-2). <br />
									Attack 1 (Brust AR 1-2). Attack 1 (Brust AR 1-2). <br />
									if madman does no damage to HP this turn, Inflict 2 Rage and 1
									Protection (Self).
								</p>
							),
						},
					],
				},
				{
					name: 'Madman',
					lv: ELITE,
					imageSrc: '/images/ks/monster-madman.png',
					hp: '80',
					role: 'Boss',
					firstIntention: OFFENSIVE,
					actions: [
						{
							intention: OFFENSIVE,
							values: [0],
							content: <p>Inflict 2 Rage and 2 Protection (Self).</p>,
						},
						{
							intention: OFFENSIVE,
							values: [1, 2, 3, 4],
							content: (
								<p>
									Attack 2 (R 1). Attack 2 (R 1). Move 1. <br />
									Attack 2 (R 1). Attack 2 (R 1). Move 1. <br />
									if madman does no damage to HP this turn, Inflict 2 Rage and 2
									Protection (Self).
								</p>
							),
						},
						{
							intention: OFFENSIVE,
							values: [5, 6],
							content: (
								<p>
									Jump 3 towards fartest player.
									<br />
									Attack 2 (R 1-2). Attack 2 (R 4-3).
								</p>
							),
						},
						{
							intention: DEFENSIVE,
							values: [0],
							content: <p>Inflict 2 Rage and 2 Protection (Self).</p>,
						},
						{
							intention: DEFENSIVE,
							values: [1, 2, 3, 4],
							content: (
								<p>
									Block 10.
									<br />
									Inflict 2 Rage and 2 Protection (Self & all monsters).
								</p>
							),
						},
						{
							intention: DEFENSIVE,
							values: [5, 6],
							content: (
								<p>
									Attack 1 (Brust AR 1-2). Attack 1 (Brust AR 1-2).
									<br />
									Inflict 2 Rage and 2 Protection (Self & all monsters).
									<br />
								</p>
							),
						},
						{
							intention: SPECIAL,
							values: ['A', 'B', 'C', 'D'],
							content: (
								<p>
									Attack 1 (Brust AR 1-2). Attack 1 (Brust AR 1-2). <br />
									Attack 1 (Brust AR 1-2). Attack 1 (Brust AR 1-2). <br />
									if madman does no damage to HP this turn, Inflict 2 Rage and 2
									Protection (Self).
								</p>
							),
						},
					],
				},
				{
					name: 'Master',
					lv: MINOR,
					imageSrc: '/images/ks/monster-master.png',
					hp: '18',
					role: 'Supporter',
					firstIntention: OFFENSIVE,
					actions: [
						{
							intention: OFFENSIVE,
							values: [0, 1, 2, 3, 4, 5, 6],
							content: (
								<p>
									Block 5. Another closest monster activate Offense X (X =
									current intention value). If no other monster: Flee.
								</p>
							),
						},
						{
							intention: DEFENSIVE,
							values: [0, 1, 2, 3, 4, 5, 6],
							content: (
								<p>
									Block 5. Another closest monster activate current Defense X (X
									= current intention value). If no other monster: Flee.
								</p>
							),
						},
						{
							intention: SPECIAL,
							values: ['A', 'B', 'C', 'D'],
							content: (
								<p>
									Block 5. Another closest monster activate current Special X (X
									= current intention value). If no other monster: Flee.
								</p>
							),
						},
					],
				},
				{
					name: 'Master',
					lv: NORMAL,
					imageSrc: '/images/ks/monster-master.png',
					hp: '20',
					role: 'Supporter',
					firstIntention: OFFENSIVE,
					actions: [
						{
							intention: OFFENSIVE,
							values: [0, 1, 2, 3, 4, 5, 6],
							content: (
								<p>
									Block 5. Another closest monster activate Offense X (X =
									current intention value). If no other monster: Flee.
								</p>
							),
						},
						{
							intention: DEFENSIVE,
							values: [0, 1, 2, 3],
							content: (
								<p>
									Block 5. Another closest monster activate current Defense X (X
									= current intention value). If no other monster: Flee.
								</p>
							),
						},
						{
							intention: DEFENSIVE,
							values: [4, 5, 6],
							content: (
								<p>
									Block 5. Another closest monster prepare a Defense intention
									card. If no other monster: Flee.
								</p>
							),
						},
						{
							intention: SPECIAL,
							values: ['A', 'B', 'C', 'D'],
							content: (
								<p>
									Block 5. Another closest monster activate current Special X (X
									= current intention value). If no other monster: Flee.
								</p>
							),
						},
					],
				},
				{
					name: 'Master',
					lv: ADVANCED,
					imageSrc: '/images/ks/monster-master.png',
					hp: '20',
					role: 'Supporter',
					firstIntention: OFFENSIVE,
					actions: [
						{
							intention: OFFENSIVE,
							values: [0, 1, 2, 3],
							content: (
								<p>
									Block 5. Another closest monster activate Offense X (X =
									current intention value). If no other monster: Flee.
								</p>
							),
						},
						{
							intention: OFFENSIVE,
							values: [4, 5, 6],
							content: (
								<p>
									Block 5. Another closest monster prepare a Offense intention
									card. If no other monster: Flee.
								</p>
							),
						},
						{
							intention: DEFENSIVE,
							values: [0, 1, 2, 3],
							content: (
								<p>
									Block 5. Another closest monster activate current Defense X (X
									= current intention value). If no other monster: Flee.
								</p>
							),
						},
						{
							intention: DEFENSIVE,
							values: [4, 5, 6],
							content: (
								<p>
									Block 5. Another closest monster prepare a Defense intention
									card. If no other monster: Flee.
								</p>
							),
						},
						{
							intention: SPECIAL,
							values: ['A', 'B'],
							content: (
								<p>
									Block 5. Another closest monster activate current Special X (X
									= current intention value). If no other monster: Flee.
								</p>
							),
						},
						{
							intention: SPECIAL,
							values: ['C', 'D'],
							content: (
								<p>
									Block 5. Another closest monster prepare a Special intention
									card. If no other monster: Flee.
								</p>
							),
						},
					],
				},
				{
					name: 'Master',
					lv: ELITE,
					imageSrc: '/images/ks/monster-master.png',
					hp: '25',
					role: 'Supporter',
					firstIntention: OFFENSIVE,
					actions: [
						{
							intention: OFFENSIVE,
							values: [0, 1, 2, 3],
							content: (
								<p>
									Block 5. Another closest monster heals 5 and activate Offense
									X (X = current intention value). If no other monster: Flee.
								</p>
							),
						},
						{
							intention: OFFENSIVE,
							values: [4, 5, 6],
							content: (
								<p>
									Block 5. Another closest monster heals 5 and prepare a Offense
									intention card. If no other monster: Flee.
								</p>
							),
						},
						{
							intention: DEFENSIVE,
							values: [0, 1, 2, 3],
							content: (
								<p>
									Block 5. Another closest monster heals 5 and activate current
									Defense X (X = current intention value). If no other monster:
									Flee.
								</p>
							),
						},
						{
							intention: DEFENSIVE,
							values: [4, 5, 6],
							content: (
								<p>
									Block 5. Another closest monster heals 5 and prepare a Defense
									intention card. If no other monster: Flee.
								</p>
							),
						},
						{
							intention: SPECIAL,
							values: ['A', 'B'],
							content: (
								<p>
									Block 5. Another closest monster heals 5 and activate current
									Special X (X = current intention value). If no other monster:
									Flee.
								</p>
							),
						},
						{
							intention: SPECIAL,
							values: ['C', 'D'],
							content: (
								<p>
									Block 5. Another closest monster heals 5 and prepare a Special
									intention card. If no other monster: Flee.
								</p>
							),
						},
					],
				},
			].sort((a, b) => {
				if (a.lv === b.lv) {
					return 0
				}
				if (
					(a.lv === MINOR &&
						(b.lv === ADVANCED || b.lv === NORMAL || b.lv === ELITE)) ||
					(a.lv === ADVANCED && (b.lv === NORMAL || b.lv === ELITE)) ||
					(a.lv === NORMAL && b.lv === ELITE)
				) {
					return -1
				}

				return 1
			}),
		[]
	)

	return (
		<>
			<div className='px-8 py-24' style={{ width: '320%' }}>
				<div className='flex flex-wrap mb-16'>
					{monsters.map((monster, i) => (
						<div
							key={i}
							style={{
								width: 442,
								height: 600,
								border: '12px solid #333',
								borderRadius: 8,
							}}
							className='flex flex-col items-stretch'
						>
							<div className='flex-none' style={{ height: 180 }}>
								<div
									className='flex flex-col-reverse'
									style={{
										height: '100%',
										backgroundImage: `url('${monster.imageSrc}')`,
										backgroundPosition: 'center 25%',
										backgroundSize: 'cover',
									}}
								>
									<div
										className='flex-none text-center py-1 rounded-t border-t-4 border-r-4 border-l-4'
										style={{
											background: 'rgba(255, 255, 255, 0.8)',
											borderColor: RESOURCES[monster.lv].color,
										}}
									>
										<div className='flex gap-x-2 items-center justify-center px-2'>
											<h3 className='flex-1 text-left'>
												<span style={{ color: RESOURCES[monster.lv].color }}>
													{RESOURCES[monster.lv].text}
												</span>{' '}
												{monster.name}
											</h3>
											<p className='bg-red-500 text-white px-2'>
												<i className='ra ra-health'></i> {monster.hp}
											</p>
											<p className='bg-blue-500 text-white px-2'>
												{monster.role}
											</p>
										</div>
									</div>
								</div>
							</div>
							<div className='flex-1 flex flex-col items-stretch'>
								{monster.actions.map((action, actionI) => (
									<div
										key={actionI}
										className='flex'
										style={{
											flex: action.values.length,
											backgroundColor: RESOURCES[action.intention].background,
										}}
									>
										<div
											className='flex-none flex flex-col'
											style={{ width: 40 }}
										>
											{action.values.map((value, valueI) => (
												<div
													key={valueI}
													className='flex-1 flex justify-center items-center border-r border-b border-gray-500'
												>
													<div
														style={{
															backgroundColor:
																RESOURCES[action.intention].color,
															width: 16,
															height: 16,
															WebkitMaskImage: `url('${
																RESOURCES[action.intention].iconSrc
															}')`,
															WebkitMaskPosition: 'center',
															WebkitMaskSize: 'cover',
														}}
													></div>
													<span
														style={{
															fontSize: '16px',
															lineHeight: '16px',
															color: RESOURCES[action.intention].color,
														}}
													>
														{value}
													</span>
												</div>
											))}
										</div>
										<div className='flex-1 flex items-center pl-2 border-b border-gray-500 text-sm'>
											{action.content}
										</div>
									</div>
								))}
							</div>
						</div>
					))}
				</div>
			</div>
		</>
	)
}

export default KsMonstersPage
