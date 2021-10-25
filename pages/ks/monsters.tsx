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
					hp: 25,
					firstIntention: OFFENSIVE,
					actions: [
						{
							intention: OFFENSIVE,
							values: [0],
							content: <p>Attack 3 (R 1)</p>,
						},
						{
							intention: OFFENSIVE,
							values: [1, 2, 3, 4, 5, 6],
							content: <p>Move 2. Attack 3 (R 1)</p>,
						},
						{
							intention: DEFENSIVE,
							values: [0],
							content: <p>Block 3.</p>,
						},
						{
							intention: DEFENSIVE,
							values: [1, 2, 3, 4, 5, 6],
							content: <p>Block 3. Inflict 1 Bleeding (R 1).</p>,
						},
						{
							intention: SPECIAL,
							values: ['A', 'B', 'C', 'D'],
							content: <p>Move 2. Inflict 1 Bleeding (R 1).</p>,
						},
					],
				},
				{
					name: 'Thug',
					lv: NORMAL,
					imageSrc: '/images/ks/monster-thug.png',
					hp: 25,
					firstIntention: OFFENSIVE,
					actions: [
						{
							intention: OFFENSIVE,
							values: [0],
							content: <p>Attack 3 (R 1)</p>,
						},
						{
							intention: OFFENSIVE,
							values: [1, 2, 3, 4, 5, 6],
							content: <p>Move 1. Attack 3 (R 1). Move 1. Attack 2 (R 1).</p>,
						},
						{
							intention: DEFENSIVE,
							values: [0],
							content: <p>Block 3.</p>,
						},
						{
							intention: DEFENSIVE,
							values: [1, 2, 3, 4],
							content: (
								<p>Block 3. Inflict 1 Bleeding to most Red cards (R 1).</p>
							),
						},
						{
							intention: DEFENSIVE,
							values: [5, 6],
							content: (
								<p>Block 3. Inflict 2 Bleedings to most Red cards (R 1).</p>
							),
						},
						{
							intention: SPECIAL,
							values: ['A', 'B', 'C', 'D'],
							content: <p>Move 2. Inflict 1 Bleeding (R 1).</p>,
						},
					],
				},
				{
					name: 'Thug',
					lv: ADVANCED,
					imageSrc: '/images/ks/monster-thug.png',
					hp: 25,
					firstIntention: OFFENSIVE,
					actions: [
						{
							intention: OFFENSIVE,
							values: [0],
							content: <p>Attack 3 (R 1)</p>,
						},
						{
							intention: OFFENSIVE,
							values: [1, 2, 3, 4],
							content: <p>Move 1. Attack 3 (R 1). Move 1. Attack 3 (R 1).</p>,
						},
						{
							intention: OFFENSIVE,
							values: [5, 6],
							content: <p>Move 2. Attack 3 (R 1). Inflict 1 Bleeding (R 1).</p>,
						},
						{
							intention: DEFENSIVE,
							values: [0],
							content: <p>Block 3. </p>,
						},
						{
							intention: DEFENSIVE,
							values: [1, 2, 3, 4],
							content: (
								<p>Block 5. Inflict 1 Bleeding to most Red cards (R 1).</p>
							),
						},
						{
							intention: DEFENSIVE,
							values: [5, 6],
							content: (
								<p>Block 5. Inflict 2 Bleedings to most Red cards (R 1).</p>
							),
						},
						{
							intention: SPECIAL,
							values: ['A', 'B'],
							content: (
								<p>
									Each player takes 3 piercing damages for each owned Bleeding.
									<br />
								</p>
							),
						},
						{
							intention: SPECIAL,
							values: ['C', 'D'],
							content: (
								<p>
									Each player inflicts 1 Bleeding.
									<br />
									Reshuffle all discarded <strong>Offense 3-6</strong> back to
									pile.
								</p>
							),
						},
					],
				},
				{
					name: 'Thug',
					lv: ELITE,
					imageSrc: '/images/ks/monster-thug.png',
					hp: 25,
					firstIntention: OFFENSIVE,
					actions: [
						{
							intention: OFFENSIVE,
							values: [0],
							content: <p>Attack 3 (R 1)</p>,
						},
						{
							intention: OFFENSIVE,
							values: [1, 2, 3, 4],
							content: (
								<p>
									Move 1. Attack 4 (R 1). <br />
									Move 1. Attack 2 (R 1). Inflict 1 Bleeding (R 1).
								</p>
							),
						},
						{
							intention: OFFENSIVE,
							values: [5, 6],
							content: (
								<p>Move 2. Attack 3 (R 1). Inflict 2 Bleedings (R 1).</p>
							),
						},
						{
							intention: DEFENSIVE,
							values: [0],
							content: <p>Block 3. </p>,
						},
						{
							intention: DEFENSIVE,
							values: [1, 2, 3, 4],
							content: (
								<p>
									Move 1. Block 5. Inflict 1 Bleeding to most Red cards (R 1).
								</p>
							),
						},
						{
							intention: DEFENSIVE,
							values: [5, 6],
							content: (
								<p>Block 5. Inflict 2 Bleedings to most Red cards (R 1).</p>
							),
						},
						{
							intention: SPECIAL,
							values: ['A', 'B'],
							content: (
								<p>
									Each player takes 3 piercing damages for each owned Bleeding.
									<br />
									Each player who does not own Bleeding inflict 1 Bleeding.
								</p>
							),
						},
						{
							intention: SPECIAL,
							values: ['C', 'D'],
							content: (
								<p>
									Each player inflicts 1 Bleeding.
									<br />
									Reshuffle all discarded <strong>Offense 3-6</strong> back to
									pile.
								</p>
							),
						},
					],
				},
				{
					name: 'Archer',
					lv: MINOR,
					imageSrc: '/images/ks/monster-archer.png',
					hp: 20,
					firstIntention: DEFENSIVE,
					actions: [
						{
							intention: OFFENSIVE,
							values: [0],
							content: <p>Deals 3 percing damages to itself.</p>,
						},
						{
							intention: OFFENSIVE,
							values: [1, 2, 3, 4, 5, 6],
							content: (
								<p>
									Attack 4 (
									<span className='text-red-700'>R X, X = intention no.</span>).
									<br /> Place a Fire trap on this space.
								</p>
							),
						},
						{
							intention: DEFENSIVE,
							values: [0],
							content: (
								<p>Remove up to one Fire trap by player&apos;s choice</p>
							),
						},
						{
							intention: DEFENSIVE,
							values: [1, 2, 3, 4, 5, 6],
							content: (
								<p>
									Inflict 2 Immobolize to most green cards (
									<span className='text-red-700'>R X, X = intention no.</span>).
									<br /> Place a Fire trap on this space.
								</p>
							),
						},
						{
							intention: SPECIAL,
							values: ['A', 'B', 'C', 'D'],
							content: (
								<p>Each Fire deals 2 damages to each player within 1 spaces.</p>
							),
						},
					],
				},
				{
					name: 'Archer',
					lv: NORMAL,
					imageSrc: '/images/ks/monster-archer.png',
					hp: 20,
					firstIntention: DEFENSIVE,
					actions: [
						{
							intention: OFFENSIVE,
							values: [0],
							content: <p>Deals 3 percing damages to itself.</p>,
						},
						{
							intention: OFFENSIVE,
							values: [1, 2, 3, 4, 5, 6],
							content: (
								<p>
									Attack 4 (
									<span className='text-red-700'>R X, X = intention no.</span>).
									<br /> Place a Fire trap on this space.
								</p>
							),
						},
						{
							intention: DEFENSIVE,
							values: [0],
							content: (
								<p>Remove up to one Fire trap by player&apos;s choice</p>
							),
						},
						{
							intention: DEFENSIVE,
							values: [1, 2, 3, 4],
							content: (
								<p>
									Inflict 2 Immobolize to most green cards (
									<span className='text-red-700'>R X, X = intention no.</span>).
									<br /> Place a Fire trap on this space.
								</p>
							),
						},
						{
							intention: DEFENSIVE,
							values: [5, 6],
							content: (
								<p>
									Inflict 2 Immobolize to most green cards (R 1-2).
									<br /> Place a Fire trap on this space.
								</p>
							),
						},
						{
							intention: SPECIAL,
							values: ['A', 'B', 'C', 'D'],
							content: (
								<p>Each Fire deals 2 damages to each player within 1 spaces.</p>
							),
						},
					],
				},
				{
					name: 'Archer',
					lv: ADVANCED,
					imageSrc: '/images/ks/monster-archer.png',
					hp: 20,
					firstIntention: DEFENSIVE,
					actions: [
						{
							intention: OFFENSIVE,
							values: [0],
							content: <p>Deals 3 percing damages to itself.</p>,
						},
						{
							intention: OFFENSIVE,
							values: [1, 2, 3, 4, 5, 6],
							content: (
								<p>
									Attack 6 (
									<span className='text-red-700'>R X, X = intention no.</span>).
									<br /> Place a Fire trap on this space.
								</p>
							),
						},
						{
							intention: DEFENSIVE,
							values: [0],
							content: (
								<p>Remove up to one Fire trap by player&apos;s choice</p>
							),
						},
						{
							intention: DEFENSIVE,
							values: [1, 2, 3, 4],
							content: (
								<p>
									Inflict 2 Immobolize to most green cards (
									<span className='text-red-700'>R X, X = intention no.</span>).
									<br /> Place a Fire trap on this space.
								</p>
							),
						},
						{
							intention: DEFENSIVE,
							values: [5, 6],
							content: (
								<p>
									Inflict 2 Immobolize to most green cards (R 1-3).
									<br /> Place a Fire trap on this space.
								</p>
							),
						},
						{
							intention: SPECIAL,
							values: ['A', 'B', 'C', 'D'],
							content: (
								<p>Each Fire deals 2 damages to each player within 1 spaces.</p>
							),
						},
					],
				},
				{
					name: 'Archer',
					lv: ELITE,
					imageSrc: '/images/ks/monster-archer.png',
					hp: 20,
					firstIntention: DEFENSIVE,
					actions: [
						{
							intention: OFFENSIVE,
							values: [0],
							content: <p>Deals 3 percing damages to itself.</p>,
						},
						{
							intention: OFFENSIVE,
							values: [1, 2],
							content: (
								<p>Attack 4 (AR 3-4). Place Fire trap on both spaces.</p>
							),
						},
						{
							intention: OFFENSIVE,
							values: [3, 4],
							content: (
								<p>Attack 4 (AR 4-5). Place Fire trap on both spaces.</p>
							),
						},
						{
							intention: OFFENSIVE,
							values: [5, 6],
							content: (
								<p>Attack 4 (AR 5-6). Place Fire trap on both spaces.</p>
							),
						},
						{
							intention: DEFENSIVE,
							values: [0],
							content: (
								<p>Remove up to one Fire trap by player&apos;s choice</p>
							),
						},
						{
							intention: DEFENSIVE,
							values: [1, 2],
							content: (
								<p>
									Inflict 2 Immobolize to most green cards (AR 3-4).
									<br /> Place Fire trap on both spaces.
								</p>
							),
						},
						{
							intention: DEFENSIVE,
							values: [3, 4],
							content: (
								<p>
									Inflict 2 Immobolize to most green cards (AR 4-5).
									<br /> Place Fire trap on both spaces.
								</p>
							),
						},
						{
							intention: DEFENSIVE,
							values: [5, 6],
							content: (
								<p>
									Inflict 2 Immobolize to most green cards (R 1-3).
									<br />
									Push 1 (R 1-3). Place a Fire trap on target&apos;s space.
								</p>
							),
						},
						{
							intention: SPECIAL,
							values: ['A', 'B'],
							content: (
								<p>Each Fire deals 2 damages to each player within 1 spaces.</p>
							),
						},
						{
							intention: SPECIAL,
							values: ['C', 'D'],
							content: <p>Place Fire trap on each space of R2, R5 and R8.</p>,
						},
					],
				},
				{
					name: 'Doctor',
					lv: MINOR,
					imageSrc: '/images/ks/monster-doctor.png',
					hp: 20,
					firstIntention: DEFENSIVE,
					actions: [
						{
							intention: OFFENSIVE,
							values: [0],
							content: <p>Inflict 1 Poison (R 1-3, monster).</p>,
						},
						{
							intention: OFFENSIVE,
							values: [1, 2, 3, 4, 5, 6],
							content: <p>Inflict 1 Poison (R 1-5, 2 players).</p>,
						},
						{
							intention: DEFENSIVE,
							values: [0],
							content: <p>Inflict 1 Disarm (R 1-3, monster).</p>,
						},
						{
							intention: DEFENSIVE,
							values: [1, 2, 3, 4, 5, 6],
							content: <p>Inflict 1 Disarm (R 1-5, 2 players).</p>,
						},
						{
							intention: SPECIAL,
							values: ['A', 'B', 'C', 'D'],
							content: (
								<p>
									Heal 3 (R 0-5, all monsters)
									<br />
									Attack 3 (R 1-5, all players)
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
					firstIntention: DEFENSIVE,
					actions: [
						{
							intention: OFFENSIVE,
							values: [0],
							content: <p>Inflict 1 Poison (R 1-3, monster).</p>,
						},
						{
							intention: OFFENSIVE,
							values: [1, 2, 3, 4, 5, 6],
							content: <p>Inflict 2 Poison (R 1-5, 2 players).</p>,
						},
						{
							intention: DEFENSIVE,
							values: [0],
							content: <p>Inflict 1 Disarm (R 1-3, monster).</p>,
						},
						{
							intention: DEFENSIVE,
							values: [1, 2, 3, 4],
							content: <p>Inflict 2 Disarm (R 1-5, 2 players).</p>,
						},
						{
							intention: DEFENSIVE,
							values: [5, 6],
							content: <p>Remove all status cards on monsters.</p>,
						},
						{
							intention: SPECIAL,
							values: ['A', 'B', 'C', 'D'],
							content: (
								<p>
									Heal 5 (R 0-5, all monsters)
									<br />
									Attack 3 (R 1-5, all players)
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
					firstIntention: DEFENSIVE,
					actions: [
						{
							intention: OFFENSIVE,
							values: [0],
							content: <p>Inflict 1 Poison (R 1-3, monster).</p>,
						},
						{
							intention: OFFENSIVE,
							values: [1, 2, 3, 4],
							content: <p>Inflict 2 Poison (R 1-5, 2 players).</p>,
						},
						{
							intention: OFFENSIVE,
							values: [5, 6],
							content: <p>Inflict 2 Poison (R 1-8, all players).</p>,
						},
						{
							intention: DEFENSIVE,
							values: [0],
							content: <p>Inflict 1 Disarm (R 1-3, monster).</p>,
						},
						{
							intention: DEFENSIVE,
							values: [1, 2, 3, 4],
							content: <p>Inflict 2 Disarm (R 1-5, 2 players).</p>,
						},
						{
							intention: DEFENSIVE,
							values: [5, 6],
							content: <p>Debuff 1 (R 1-5, all monsters).</p>,
						},
						{
							intention: SPECIAL,
							values: ['A', 'B'],
							content: (
								<p>
									Heal 5 (R 0-5, all monsters)
									<br />
									Each player discards 2 top cards from their library for each
									status cards they owned.
								</p>
							),
						},
						{
							intention: SPECIAL,
							values: ['C', 'D'],
							content: (
								<p>
									Heal 5 (R 0-5, all monsters)
									<br />
									Each player takes 1 piercing damages for each status cards
									they owned.
								</p>
							),
						},
					],
				},
				{
					name: 'Doctor',
					lv: ELITE,
					imageSrc: '/images/ks/monster-doctor.png',
					hp: 20,
					firstIntention: DEFENSIVE,
					actions: [
						{
							intention: OFFENSIVE,
							values: [0],
							content: <p>Inflict 1 Poison (R 1-3, monster).</p>,
						},
						{
							intention: OFFENSIVE,
							values: [1, 2],
							content: (
								<p>
									Inflict 2 Poison (R 1-5, 2 players).
									<br />
									Remove all blocks (R 1-5, 2 players)
								</p>
							),
						},
						{
							intention: OFFENSIVE,
							values: [3, 4, 5, 6],
							content: (
								<p>
									Inflict 2 Poison (R 1-8, all players).
									<br />
									Remove all blocks (R 1-8, all players)
								</p>
							),
						},
						{
							intention: DEFENSIVE,
							values: [0],
							content: <p>Inflict 1 Disarm (R 1-3, monster).</p>,
						},
						{
							intention: DEFENSIVE,
							values: [1, 2],
							content: <p>Inflict 2 Disarm (R 1-5, 2 players).</p>,
						},
						{
							intention: DEFENSIVE,
							values: [3, 4, 5, 6],
							content: (
								<p>
									Debuff 1 (R 1-5, all monsters).
									<br />
									Inflict 1 Protection (R 1-5, all monsters)
								</p>
							),
						},
						{
							intention: SPECIAL,
							values: ['A', 'B'],
							content: (
								<p>
									Heal 5 (R 0-5, all monsters)
									<br />
									Each player discards 2 top cards from their library for each
									status cards they owned.
								</p>
							),
						},
						{
							intention: SPECIAL,
							values: ['C', 'D'],
							content: (
								<p>
									Heal 5 (R 0-5, all monsters)
									<br />
									Each player takes 1 piercing damages for each status cards
									they owned.
								</p>
							),
						},
					],
				},
				{
					name: 'Flyer',
					lv: MINOR,
					imageSrc: '/images/ks/monster-flyer.png',
					hp: '20 (+1 Armor)',
					firstIntention: DEFENSIVE,
					actions: [
						{
							intention: OFFENSIVE,
							values: [0],
							content: <p>Lose armor until next intention card</p>,
						},
						{
							intention: OFFENSIVE,
							values: [1, 2, 3, 4, 5, 6],
							content: (
								<p>
									Attack 2 (R 0-1). Piercing Attack 3 (R 0-1).
									<br />
									Face to fartest player, then Jump exactly 4, then face to
									closest player.
								</p>
							),
						},
						{
							intention: DEFENSIVE,
							values: [0],
							content: <p>Lose armor until next intention card</p>,
						},
						{
							intention: DEFENSIVE,
							values: [1, 2, 3, 4, 5, 6],
							content: (
								<p>
									Face to fartest player, then Jump exactly 4, then face to
									closest player.
									<br />
									Inflict 1 Immobolize (R 1)
								</p>
							),
						},
						{
							intention: SPECIAL,
							values: ['A', 'B', 'C', 'D'],
							content: (
								<p>
									Place this monster onto cloeset player. <br />
									Until this monster is being pushed/pulled, it will keep in the
									same space of that player, and do not actively move/jump by
									other actions.
								</p>
							),
						},
					],
				},
				{
					name: 'Flyer',
					lv: NORMAL,
					imageSrc: '/images/ks/monster-flyer.png',
					hp: '20 (+1 Armor)',
					firstIntention: DEFENSIVE,
					actions: [
						{
							intention: OFFENSIVE,
							values: [0],
							content: <p>Lose armor until next intention card</p>,
						},
						{
							intention: OFFENSIVE,
							values: [1, 2, 3, 4, 5, 6],
							content: (
								<p>
									Attack 3 (R 0-1). Piercing Attack 3 (R 0-1).
									<br />
									Face to fartest player, then Jump exactly 4, then face to
									closest player.
								</p>
							),
						},
						{
							intention: DEFENSIVE,
							values: [0],
							content: <p>Lose armor until next intention card</p>,
						},
						{
							intention: DEFENSIVE,
							values: [1, 2, 3],
							content: (
								<p>
									Face to fartest player, then Jump exactly 4, then face to
									closest player.
									<br />
									Inflict 1 Immobolize (R 1)
								</p>
							),
						},
						{
							intention: DEFENSIVE,
							values: [4, 5, 6],
							content: (
								<p>
									Pull 1 (R 1-2)
									<br />
									Inflict 1 Immobolize (R 1)
								</p>
							),
						},
						{
							intention: SPECIAL,
							values: ['A', 'B', 'C', 'D'],
							content: (
								<p>
									Place this monster onto cloeset player. <br />
									Until this monster is being pushed/pulled, it will keep in the
									same space of that player, and do not actively move/jump by
									other actions.
								</p>
							),
						},
					],
				},
				{
					name: 'Flyer',
					lv: ADVANCED,
					imageSrc: '/images/ks/monster-flyer.png',
					hp: '20 (+1 Armor)',
					firstIntention: DEFENSIVE,
					actions: [
						{
							intention: OFFENSIVE,
							values: [0],
							content: <p>Lose armor until next intention card</p>,
						},
						{
							intention: OFFENSIVE,
							values: [1, 2, 3],
							content: (
								<p>
									Attack 4 (R 0-1). Piercing Attack 4 (R 0-1).
									<br />
									Face to fartest player, then Jump exactly 4, then face to
									closest player.
								</p>
							),
						},
						{
							intention: OFFENSIVE,
							values: [4, 5, 6],
							content: (
								<p>
									Attack 2 (R 1-5, all players).
									<br />
									<br />
									Face to fartest player, then Jump exactly 4, then face to
									closest player.
								</p>
							),
						},
						{
							intention: DEFENSIVE,
							values: [0],
							content: <p>Lose armor until next intention card</p>,
						},
						{
							intention: DEFENSIVE,
							values: [1, 2, 3],
							content: (
								<p>
									Face to fartest player, then Jump exactly 4, then face to
									closest player.
									<br />
									Inflict 1 Immobolize (R 1)
								</p>
							),
						},
						{
							intention: DEFENSIVE,
							values: [4, 5, 6],
							content: (
								<p>
									Pull 1 (R 1-2)
									<br />
									Inflict 1 Immobolize (R 1)
								</p>
							),
						},
						{
							intention: SPECIAL,
							values: ['A', 'B', 'C', 'D'],
							content: (
								<p>
									Place this monster onto cloeset player. <br />
									Until this monster is being pushed/pulled, it will keep in the
									same space of that player, and do not actively move/jump by
									other actions.
								</p>
							),
						},
					],
				},
				{
					name: 'Flyer',
					lv: ELITE,
					imageSrc: '/images/ks/monster-flyer.png',
					hp: '20 (+1 Armor)',
					firstIntention: DEFENSIVE,
					actions: [
						{
							intention: OFFENSIVE,
							values: [0],
							content: <p>Lose armor until next intention card</p>,
						},
						{
							intention: OFFENSIVE,
							values: [1, 2, 3],
							content: (
								<p>
									Attack 4 (R 0-1). Piercing Attack 4 (R 0-1).
									<br />
									Face to fartest player, then Jump exactly 4, then face to
									closest player.
								</p>
							),
						},
						{
							intention: OFFENSIVE,
							values: [4, 5, 6],
							content: (
								<p>
									Attack 2 (R 1-5, all players).
									<br />
									Face to fartest player, then Jump exactly 4, then face to
									closest player.
								</p>
							),
						},
						{
							intention: DEFENSIVE,
							values: [0],
							content: <p>Lose armor until next intention card</p>,
						},
						{
							intention: DEFENSIVE,
							values: [1, 2, 3],
							content: (
								<p>
									Face to fartest player, then Jump exactly 4, then face to
									closest player.
									<br />
									Inflict 1 Immobolize (R 1)
								</p>
							),
						},
						{
							intention: DEFENSIVE,
							values: [4, 5, 6],
							content: (
								<p>
									Pull 1 (R 1-2)
									<br />
									Inflict 1 Immobolize (R 1)
								</p>
							),
						},
						{
							intention: SPECIAL,
							values: ['A', 'B', 'C', 'D'],
							content: (
								<p>
									Place this monster onto cloeset player. <br />
									Until this monster is being pushed/pulled, it will keep in the
									same space of that player, and do not actively move/jump by
									other actions.
								</p>
							),
						},
					],
				},
				{
					name: 'Mad man',
					lv: MINOR,
					imageSrc: '/images/ks/monster-madman.png',
					hp: '65',
					firstIntention: OFFENSIVE,
					actions: [
						{
							intention: OFFENSIVE,
							values: [0],
							content: <p>Attack 3 (R 1)</p>,
						},
						{
							intention: OFFENSIVE,
							values: [1, 2, 3, 4, 5, 6],
							content: (
								<p>
									Move 1. Attack 3 (R 1).
									<br />
									Move 1. Piercing Attack X (R 1, X = number of died players and
									monsters in this combat).
								</p>
							),
						},
						{
							intention: DEFENSIVE,
							values: [0],
							content: <p>Heal 5</p>,
						},
						{
							intention: DEFENSIVE,
							values: [1, 2, 3, 4, 5, 6],
							content: (
								<p>
									Heal 3 for each died player and monster in this combat. (R 0).
								</p>
							),
						},
						{
							intention: SPECIAL,
							values: ['A', 'B', 'C', 'D'],
							content: (
								<p>
									Summon 1 Thug of same level 1 HP on cloeset empty spaces.
									<br />
									It activate its turn right after this monster&apos;s turn.
								</p>
							),
						},
					],
				},
				{
					name: 'Mad man',
					lv: NORMAL,
					imageSrc: '/images/ks/monster-madman.png',
					hp: '65',
					firstIntention: OFFENSIVE,
					actions: [
						{
							intention: OFFENSIVE,
							values: [0],
							content: <p>Attack 3 (R 1)</p>,
						},
						{
							intention: OFFENSIVE,
							values: [1, 2, 3, 4, 5, 6],
							content: (
								<p>
									Move 1. Attack 3 (R 1).
									<br />
									Move 1. Piercing Attack X (R 1, X = number of died players and
									monsters in this combat).
								</p>
							),
						},
						{
							intention: DEFENSIVE,
							values: [0],
							content: <p>Heal 5</p>,
						},
						{
							intention: DEFENSIVE,
							values: [1, 2, 3, 4],
							content: (
								<p>
									Heal 3 for each died player and monster in this combat. (R 0).
									<br />
									Move 1.
								</p>
							),
						},
						{
							intention: DEFENSIVE,
							values: [5, 6],
							content: (
								<p>
									Each player discards 2 cards from their play area.
									<br />
									Move 1.
								</p>
							),
						},
						{
							intention: SPECIAL,
							values: ['A', 'B', 'C', 'D'],
							content: (
								<p>
									Summon 1 Thug of same level with 1 HP on cloeset empty spaces.
									<br />
									It activate its turn right after this monster&apos;s turn.
								</p>
							),
						},
					],
				},
				{
					name: 'Mad man',
					lv: ADVANCED,
					imageSrc: '/images/ks/monster-madman.png',
					hp: '65',
					firstIntention: OFFENSIVE,
					actions: [
						{
							intention: OFFENSIVE,
							values: [0],
							content: <p>Attack 3 (R 1)</p>,
						},
						{
							intention: OFFENSIVE,
							values: [1, 2, 3, 4],
							content: (
								<p>
									Move 1. Attack 3 (R 1).
									<br />
									Move 1. Piercing Attack X (R 1, X = number of died players and
									monsters in this combat).
								</p>
							),
						},
						{
							intention: OFFENSIVE,
							values: [5, 6],
							content: (
								<p>
									Move 1. Attack 2+X (R 1-5, all players, X = number of died
									players and monsters in this combat).
								</p>
							),
						},
						{
							intention: DEFENSIVE,
							values: [0],
							content: <p>Heal 5</p>,
						},
						{
							intention: DEFENSIVE,
							values: [1, 2, 3, 4],
							content: (
								<p>
									Move 1.
									<br />
									Heal 3 for each died player and monster in this combat. (R 0).
								</p>
							),
						},
						{
							intention: DEFENSIVE,
							values: [5, 6],
							content: (
								<p>
									Move 1.
									<br />
									Each player discards 2 cards from their play area.
								</p>
							),
						},
						{
							intention: SPECIAL,
							values: ['A', 'B', 'C', 'D'],
							content: (
								<p>
									Summon 1 Thug of same level with 1 HP on cloeset empty spaces.
									<br />
									It activate its turn right after this monster&apos;s turn.
								</p>
							),
						},
					],
				},
				{
					name: 'Mad man',
					lv: ELITE,
					imageSrc: '/images/ks/monster-madman.png',
					hp: '65',
					firstIntention: OFFENSIVE,
					actions: [
						{
							intention: OFFENSIVE,
							values: [0],
							content: <p>Attack 3 (R 1)</p>,
						},
						{
							intention: OFFENSIVE,
							values: [1, 2, 3, 4],
							content: (
								<p>
									Move 1. Attack 5 (R 1).
									<br />
									Move 1. Piercing Attack X (R 1, X = number of died players and
									monsters in this combat).
								</p>
							),
						},
						{
							intention: OFFENSIVE,
							values: [5, 6],
							content: (
								<p>
									Move 1. Attack 4+X (R 1-5, all players, X = number of died
									players and monsters in this combat).
								</p>
							),
						},
						{
							intention: DEFENSIVE,
							values: [0],
							content: <p>Heal 5</p>,
						},
						{
							intention: DEFENSIVE,
							values: [1, 2, 3, 4],
							content: (
								<p>
									Move 1.
									<br />
									Heal 3 for each died player and monster in this combat. (R 0).
								</p>
							),
						},
						{
							intention: DEFENSIVE,
							values: [5, 6],
							content: (
								<p>
									Move 1.
									<br />
									Each player discards 3 cards from their play area.
								</p>
							),
						},
						{
							intention: SPECIAL,
							values: ['A', 'B', 'C', 'D'],
							content: (
								<p>
									Summon 2 Thugs of same level with 1 HP on cloeset empty
									spaces.
									<br />
									It activate its turn right after this monster&apos;s turn.
								</p>
							),
						},
					],
				},
				{
					name: 'Master',
					lv: MINOR,
					imageSrc: '/images/ks/monster-master.png',
					hp: '20',
					firstIntention: OFFENSIVE,
					actions: [
						{
							intention: OFFENSIVE,
							values: [0],
							content: <p>Do nothing.</p>,
						},
						{
							intention: OFFENSIVE,
							values: [1, 2, 3, 4, 5, 6],
							content: (
								<p>
									Block 5. Another cloeset monster activate Offense X (X =
									current intention value). If no other monster: Flee.
								</p>
							),
						},
						{
							intention: DEFENSIVE,
							values: [0],
							content: <p>Do nothing</p>,
						},
						{
							intention: DEFENSIVE,
							values: [1, 2, 3, 4, 5, 6],
							content: (
								<p>
									Block 5. Another cloeset monster activate current Defense X (X
									= current intention value). If no other monster: Flee.
								</p>
							),
						},
						{
							intention: SPECIAL,
							values: ['A', 'B', 'C', 'D'],
							content: (
								<p>
									Block 5. Another cloeset monster activate current Special X (X
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
					firstIntention: OFFENSIVE,
					actions: [
						{
							intention: OFFENSIVE,
							values: [0],
							content: <p>Do nothing.</p>,
						},
						{
							intention: OFFENSIVE,
							values: [1, 2, 3, 4, 5, 6],
							content: (
								<p>
									Block 5. Another cloeset monster activate Offense X (X =
									current intention value). If no other monster: Flee.
								</p>
							),
						},
						{
							intention: DEFENSIVE,
							values: [0],
							content: <p>Do nothing</p>,
						},
						{
							intention: DEFENSIVE,
							values: [1, 2, 3],
							content: (
								<p>
									Block 5. Another cloeset monster activate current Defense X (X
									= current intention value). If no other monster: Flee.
								</p>
							),
						},
						{
							intention: DEFENSIVE,
							values: [4, 5, 6],
							content: (
								<p>
									Block 5. Another cloeset monster prepare a Defense intention
									card. If no other monster: Flee.
								</p>
							),
						},
						{
							intention: SPECIAL,
							values: ['A', 'B', 'C', 'D'],
							content: (
								<p>
									Block 5. Another cloeset monster activate current Special X (X
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
					firstIntention: OFFENSIVE,
					actions: [
						{
							intention: OFFENSIVE,
							values: [0],
							content: <p>Do nothing.</p>,
						},
						{
							intention: OFFENSIVE,
							values: [1, 2, 3],
							content: (
								<p>
									Block 5. Another cloeset monster activate Offense X (X =
									current intention value). If no other monster: Flee.
								</p>
							),
						},
						{
							intention: OFFENSIVE,
							values: [4, 5, 6],
							content: (
								<p>
									Block 5. Another cloeset monster prepare a Offense intention
									card. If no other monster: Flee.
								</p>
							),
						},
						{
							intention: DEFENSIVE,
							values: [0],
							content: <p>Do nothing</p>,
						},
						{
							intention: DEFENSIVE,
							values: [1, 2, 3],
							content: (
								<p>
									Block 5. Another cloeset monster activate current Defense X (X
									= current intention value). If no other monster: Flee.
								</p>
							),
						},
						{
							intention: DEFENSIVE,
							values: [4, 5, 6],
							content: (
								<p>
									Block 5. Another cloeset monster prepare a Defense intention
									card. If no other monster: Flee.
								</p>
							),
						},
						{
							intention: SPECIAL,
							values: ['A', 'B'],
							content: (
								<p>
									Block 5. Another cloeset monster activate current Special X (X
									= current intention value). If no other monster: Flee.
								</p>
							),
						},
						{
							intention: SPECIAL,
							values: ['C', 'D'],
							content: (
								<p>
									Block 5. Another cloeset monster prepare a Special intention
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
					hp: '20',
					firstIntention: OFFENSIVE,
					actions: [
						{
							intention: OFFENSIVE,
							values: [0],
							content: <p>Do nothing.</p>,
						},
						{
							intention: OFFENSIVE,
							values: [1, 2, 3],
							content: (
								<p>
									Block 5. Another cloeset monster heals 5 and activate Offense
									X (X = current intention value). If no other monster: Flee.
								</p>
							),
						},
						{
							intention: OFFENSIVE,
							values: [4, 5, 6],
							content: (
								<p>
									Block 5. Another cloeset monster heals 5 and prepare a Offense
									intention card. If no other monster: Flee.
								</p>
							),
						},
						{
							intention: DEFENSIVE,
							values: [0],
							content: <p>Do nothing</p>,
						},
						{
							intention: DEFENSIVE,
							values: [1, 2, 3],
							content: (
								<p>
									Block 5. Another cloeset monster heals 5 and activate current
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
									Block 5. Another cloeset monster heals 5 and prepare a Defense
									intention card. If no other monster: Flee.
								</p>
							),
						},
						{
							intention: SPECIAL,
							values: ['A', 'B'],
							content: (
								<p>
									Block 5. Another cloeset monster heals 5 and activate current
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
									Block 5. Another cloeset monster heals 5 and prepare a Special
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
		],
		[]
	)

	return (
		<>
			<div className='px-8 py-24' style={{ width: '210%' }}>
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
										className='flex-none text-center py-1 rounded-t'
										style={{ background: 'rgba(255, 255, 255, 0.8)' }}
									>
										<h3>
											<span style={{ color: RESOURCES[monster.lv].color }}>
												{RESOURCES[monster.lv].text}
											</span>{' '}
											{monster.name}
										</h3>
										<div className='flex justify-center items-center gap-x-6'>
											<p className='text-red-500'>
												<i className='ra ra-health'></i> HP: {monster.hp}
											</p>
											<div>
												<div className='inline-flex flex-nowrap items-center'>
													<span>first intention: </span>
													<div
														style={{
															backgroundColor:
																RESOURCES[monster.firstIntention].color,
															width: 16,
															height: 16,
															WebkitMaskImage: `url('${
																RESOURCES[monster.firstIntention].iconSrc
															}')`,
															WebkitMaskPosition: 'center',
															WebkitMaskSize: 'cover',
														}}
													></div>
													<span
														style={{
															fontSize: '16px',
															lineHeight: '16px',
															color: RESOURCES[monster.firstIntention].color,
														}}
													>
														{RESOURCES[monster.firstIntention].text}
													</span>
												</div>
											</div>
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
				<div className='flex flex-wrap mb-16'>
					{intentions.map((intention, i) => (
						<div
							key={i}
							style={{
								width: 375,
								height: 212,
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

export default KsMonstersPage
