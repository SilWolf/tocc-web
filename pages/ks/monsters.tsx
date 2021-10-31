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
							content: <p>Attack 3 (R 4-1). Inflict 1 Bleeding (R 1).</p>,
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
							content: <p>Attack 3 (R 1).</p>,
						},
						{
							intention: OFFENSIVE,
							values: [1, 2, 3, 4, 5, 6],
							content: (
								<p>
									Move 2.
									<br />
									Attack 3 (R 1). Inflict 2 Bleedings. (R 1).
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
							content: <p>Attack 3 (R 4-1). Inflict 2 Bleedings (R 1).</p>,
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
									Attack 3 (R 1). Piercing Attack 3 (R 1).
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
							content: <p>Attack 3 (R 4-1). Inflict 2 Bleedings (R 1).</p>,
						},
					],
				},
				{
					name: 'Thug',
					lv: ELITE,
					imageSrc: '/images/ks/monster-thug.png',
					hp: 30,
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
									Attack 4 (R 1). Piercing Attack 3 (R 1).
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
							values: ['A', 'B'],
							content: <p>Attack 4 (R 4-1). Inflict 2 Bleedings (R 1).</p>,
						},
						{
							intention: SPECIAL,
							values: ['C', 'D'],
							content: (
								<p>
									Each player takes 2 piercing damage for each Bleeding they
									owned.
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
					firstIntention: DEFENSIVE,
					actions: [
						{
							intention: OFFENSIVE,
							values: [0],
							content: <p>Push 1 & Inflict 1 Disarm to most Red card (R 1).</p>,
						},
						{
							intention: OFFENSIVE,
							values: [1, 2, 3, 4, 5, 6],
							content: (
								<p>
									Attack 3 (R 5-3).
									<br />
									Push 1 & Inflict 1 Disarm to most Red card (R 1).
								</p>
							),
						},
						{
							intention: DEFENSIVE,
							values: [0],
							content: <p>Push 1 & Inflict 1 Disarm to most Red card (R 1).</p>,
						},
						{
							intention: DEFENSIVE,
							values: [1, 2, 3, 4, 5, 6],
							content: (
								<p>
									Attack 3 (R 1-3).
									<br />
									Push 1 & Inflict 1 Disarm to most Red card (R 1).
									<br />
									Back 1.
								</p>
							),
						},
						{
							intention: SPECIAL,
							values: ['A'],
							content: <p>Attack 4 (R 2).</p>,
						},
						{
							intention: SPECIAL,
							values: ['B'],
							content: <p>Attack 4 (R 3).</p>,
						},
						{
							intention: SPECIAL,
							values: ['C'],
							content: <p>Attack 4 (R 4).</p>,
						},
						{
							intention: SPECIAL,
							values: ['D'],
							content: <p>Attack 4 (R 5).</p>,
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
							content: <p>Push 1 & Inflict 1 Disarm to most Red card (R 1).</p>,
						},
						{
							intention: OFFENSIVE,
							values: [1, 2, 3, 4, 5, 6],
							content: (
								<p>
									Attack 3 (R 5-3).
									<br />
									Push 1 & Inflict 1 Disarm to most Red card (R 1).
								</p>
							),
						},
						{
							intention: DEFENSIVE,
							values: [0],
							content: <p>Push 1 & Inflict 1 Disarm to most Red card (R 1).</p>,
						},
						{
							intention: DEFENSIVE,
							values: [1, 2, 3, 4, 5],
							content: (
								<p>
									Attack 3 (R 1-3).
									<br />
									Push 1 & Inflict 1 Disarm to most Red card (R 1).
									<br />
									Back 1.
								</p>
							),
						},
						{
							intention: DEFENSIVE,
							values: [6],
							content: <p>Push 6 (R 1-3).</p>,
						},
						{
							intention: SPECIAL,
							values: ['A'],
							content: <p>Attack 6 (R 2).</p>,
						},
						{
							intention: SPECIAL,
							values: ['B'],
							content: <p>Attack 6 (R 3).</p>,
						},
						{
							intention: SPECIAL,
							values: ['C'],
							content: <p>Attack 6 (R 4).</p>,
						},
						{
							intention: SPECIAL,
							values: ['D'],
							content: <p>Attack 6 (R 5).</p>,
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
							content: <p>Push 1 & Inflict 1 Disarm to most Red card (R 1).</p>,
						},
						{
							intention: OFFENSIVE,
							values: [1, 2, 3, 4, 5],
							content: (
								<p>
									Attack 3 (R 5-3).
									<br />
									Push 1 & Inflict 1 Disarm to most Red card (R 1).
								</p>
							),
						},
						{
							intention: OFFENSIVE,
							values: [6],
							content: <p>Attack 6 (R 5-3).</p>,
						},
						{
							intention: DEFENSIVE,
							values: [0],
							content: <p>Push 1 & Inflict 1 Disarm to most Red card (R 1).</p>,
						},
						{
							intention: DEFENSIVE,
							values: [1, 2, 3, 4, 5],
							content: (
								<p>
									Attack 3 (R 1-3).
									<br />
									Push 1 & Inflict 1 Disarm to most Red card (R 1).
									<br />
									Back 1.
								</p>
							),
						},
						{
							intention: DEFENSIVE,
							values: [6],
							content: <p>Push 6 (R 1-3).</p>,
						},
						{
							intention: SPECIAL,
							values: ['A'],
							content: <p>Attack 6 (R 2).</p>,
						},
						{
							intention: SPECIAL,
							values: ['B'],
							content: <p>Attack 6 (R 3).</p>,
						},
						{
							intention: SPECIAL,
							values: ['C'],
							content: <p>Attack 6 (R 4).</p>,
						},
						{
							intention: SPECIAL,
							values: ['D'],
							content: <p>Attack 6 (R 5).</p>,
						},
					],
				},
				{
					name: 'Archer',
					lv: ELITE,
					imageSrc: '/images/ks/monster-archer.png',
					hp: 25,
					firstIntention: DEFENSIVE,
					actions: [
						{
							intention: OFFENSIVE,
							values: [0],
							content: <p>Push 1 & Inflict 2 Disarm to most Red card (R 1).</p>,
						},
						{
							intention: OFFENSIVE,
							values: [1, 2, 3, 4, 5],
							content: (
								<p>
									Attack 3 (R 5-3). Piercing Attack 1 (R 5-3).
									<br />
									Push 1 & Inflict 2 Disarm to most Red card (R 1).
								</p>
							),
						},
						{
							intention: OFFENSIVE,
							values: [6],
							content: <p>Attack 6 (R 5-3). Piercing Attack 2 (R 5-3).</p>,
						},
						{
							intention: DEFENSIVE,
							values: [0],
							content: <p>Push 1 & Inflict 2 Disarm to most Red card (R 1).</p>,
						},
						{
							intention: DEFENSIVE,
							values: [1, 2, 3, 4, 5],
							content: (
								<p>
									Attack 3 (R 1-3). Piercing Attack 1 (R 1-3).
									<br />
									Push 1 & Inflict 2 Disarm to most Red card (R 1).
									<br />
									Back 1.
								</p>
							),
						},
						{
							intention: DEFENSIVE,
							values: [6],
							content: (
								<p>Push 6 & Inflict 2 Immobolize to most Green card (R 1-3).</p>
							),
						},
						{
							intention: SPECIAL,
							values: ['A'],
							content: <p>Attack 10 (R 2).</p>,
						},
						{
							intention: SPECIAL,
							values: ['B'],
							content: <p>Attack 10 (R 3).</p>,
						},
						{
							intention: SPECIAL,
							values: ['C'],
							content: <p>Attack 10 (R 4).</p>,
						},
						{
							intention: SPECIAL,
							values: ['D'],
							content: <p>Attack 10 (R 5).</p>,
						},
					],
				},
				{
					name: 'Doctor',
					lv: MINOR,
					imageSrc: '/images/ks/monster-doctor.png',
					hp: 18,
					firstIntention: DEFENSIVE,
					actions: [
						{
							intention: OFFENSIVE,
							values: [0],
							content: <p>Discard 1 (R 1-3).</p>,
						},
						{
							intention: OFFENSIVE,
							values: [1, 2, 3, 4, 5, 6],
							content: <p>Discard 1 (R 1-8 Brust, 2 players).</p>,
						},
						{
							intention: DEFENSIVE,
							values: [0],
							content: <p>Heal 3 & remove status cards (R 1-3, monster).</p>,
						},
						{
							intention: DEFENSIVE,
							values: [1, 2, 3, 4, 5, 6],
							content: (
								<p>
									Heal 3 & remove status cards (R 1-8 Brust, 2 monsters).
									<br />
								</p>
							),
						},
						{
							intention: SPECIAL,
							values: ['A', 'B', 'C', 'D'],
							content: (
								<p>
									Each player lose 1 HP for every 2 empty slots in their play
									areas.
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
					firstIntention: DEFENSIVE,
					actions: [
						{
							intention: OFFENSIVE,
							values: [0],
							content: <p>Discard 2 (R 1-3).</p>,
						},
						{
							intention: OFFENSIVE,
							values: [1, 2, 3, 4, 5, 6],
							content: <p>Discard 2 (R 1-8 Brust, 2 players).</p>,
						},
						{
							intention: DEFENSIVE,
							values: [0],
							content: <p>Heal 3 & remove status cards (R 1-3, monster).</p>,
						},
						{
							intention: DEFENSIVE,
							values: [1, 2, 3, 4],
							content: (
								<p>Heal 3 & remove status cards (R 1-8 Brust, 2 monsters).</p>
							),
						},
						{
							intention: DEFENSIVE,
							values: [5, 6],
							content: (
								<p>Heal 3 & remove status cards (R 1-8 Brust, all monsters).</p>
							),
						},
						{
							intention: SPECIAL,
							values: ['A', 'B', 'C', 'D'],
							content: (
								<p>
									Each player lose 1 HP for every 2 empty slots in their play
									areas.
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
					firstIntention: DEFENSIVE,
					actions: [
						{
							intention: OFFENSIVE,
							values: [0],
							content: <p>Discard 2 (R 1-3).</p>,
						},
						{
							intention: OFFENSIVE,
							values: [1, 2],
							content: (
								<p>
									Discard all cards in left columns (R 1-8 Brust, 2 players).
								</p>
							),
						},
						{
							intention: OFFENSIVE,
							values: [3, 4],
							content: (
								<p>
									Discard all cards in right columns (R 1-8 Brust, 2 players).
								</p>
							),
						},
						{
							intention: OFFENSIVE,
							values: [5, 6],
							content: (
								<p>
									Discard all cards in center columns (R 1-8 Brust, 2 players).
								</p>
							),
						},
						{
							intention: DEFENSIVE,
							values: [0],
							content: <p>Heal 5 & remove status cards (R 1-3, monster).</p>,
						},
						{
							intention: DEFENSIVE,
							values: [1, 2, 3, 4],
							content: (
								<p>Heal 5 & remove status cards (R 1-8 Brust, 2 monsters).</p>
							),
						},
						{
							intention: DEFENSIVE,
							values: [5, 6],
							content: (
								<p>Heal 5 & remove status cards (R 1-8 Brust, all monsters).</p>
							),
						},
						{
							intention: SPECIAL,
							values: ['A', 'B', 'C', 'D'],
							content: (
								<p>
									Each player lose 1 HP for every 2 empty slots in their play
									areas.
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
					firstIntention: DEFENSIVE,
					actions: [
						{
							intention: OFFENSIVE,
							values: [0],
							content: <p>Discard 3 (R 1-3).</p>,
						},
						{
							intention: OFFENSIVE,
							values: [1, 2],
							content: (
								<p>
									Discard all cards in left columns (R 1-8 Brust, 2 players).
								</p>
							),
						},
						{
							intention: OFFENSIVE,
							values: [3, 4],
							content: (
								<p>
									Discard all cards in right columns (R 1-8 Brust, 2 players).
								</p>
							),
						},
						{
							intention: OFFENSIVE,
							values: [5, 6],
							content: (
								<p>
									Discard all cards in center columns (R 1-8 Brust, 2 players).
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
								<p>Heal 5 & remove status cards (R 1-8 Brust, 2 monsters).</p>
							),
						},
						{
							intention: DEFENSIVE,
							values: [5, 6],
							content: (
								<p>Heal 5 & remove status cards (R 1-8 Brust, all monsters).</p>
							),
						},
						{
							intention: SPECIAL,
							values: ['A', 'B', 'C', 'D'],
							content: (
								<p>
									Each player lose 1 HP for every 2 empty slots in their play
									areas.
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
					firstIntention: DEFENSIVE,
					actions: [
						{
							intention: OFFENSIVE,
							values: [0],
							content: <p>Drain 2 HP (R 0).</p>,
						},
						{
							intention: OFFENSIVE,
							values: [1, 2, 3, 4, 5, 6],
							content: (
								<p>
									Drain 2 HP (R 0).
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
							content: <p>Drain 2 HP (R 0).</p>,
						},
						{
							intention: DEFENSIVE,
							values: [1, 2, 3, 4, 5, 6],
							content: (
								<p>
									Drain 2 HP (R 0).
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
									Place a monster token onto closet player, then set aside
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
					firstIntention: DEFENSIVE,
					actions: [
						{
							intention: OFFENSIVE,
							values: [0],
							content: <p>Drain 2 HP (R 0).</p>,
						},
						{
							intention: OFFENSIVE,
							values: [1, 2, 3, 4, 5, 6],
							content: (
								<p>
									Drain 2 HP (R 0).
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
							content: <p>Drain 2 HP (R 0).</p>,
						},
						{
							intention: DEFENSIVE,
							values: [1, 2, 3],
							content: (
								<p>
									Drain 2 HP (R 0).
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
									Drain 2 HP (R 0).
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
									Place a monster token onto closet player, then set aside
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
					firstIntention: DEFENSIVE,
					actions: [
						{
							intention: OFFENSIVE,
							values: [0],
							content: <p>Drain 2 HP & Discard 1 Blue/any cards (R 0).</p>,
						},
						{
							intention: OFFENSIVE,
							values: [1, 2, 3],
							content: (
								<p>
									Drain 2 HP & Discard 1 Blue/any cards (R 0).
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
									Drain 2 HP & Discard 1 Blue/any cards (R 0).
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
							content: <p>Drain 2 HP & Discard 1 Red/any cards (R 0).</p>,
						},
						{
							intention: DEFENSIVE,
							values: [1, 2, 3],
							content: (
								<p>
									Drain 2 HP & Discard 1 Red/any cards (R 0).
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
									Drain 2 HP & Discard 1 Red/any cards (R 0).
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
									Place a monster token onto closet player, then set aside
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
					firstIntention: SPECIAL,
					actions: [
						{
							intention: OFFENSIVE,
							values: [0],
							content: <p>Drain 4 HP & Discard 2 Blue/any cards (R 0).</p>,
						},
						{
							intention: OFFENSIVE,
							values: [1, 2, 3],
							content: (
								<p>
									Drain 4 HP & Discard 2 Blue/any cards (R 0).
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
									Drain 4 HP & Discard 2 Blue/any cards (R 0).
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
							content: <p>Drain 4 HP & Discard 2 Red/any cards (R 0).</p>,
						},
						{
							intention: DEFENSIVE,
							values: [1, 2, 3],
							content: (
								<p>
									Drain 4 HP & Discard 2 Red/any cards (R 0).
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
									Drain 4 HP & Discard 2 Red/any cards (R 0).
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
									Place a monster token onto closet player, then set aside
									flyer&apos;s figure. Flyer is on the same space of marker.
									<br />
									<span className='text-red-700 font-bold'>
										If marked player dies
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
					hp: (
						<p>
							30 + <strong className='text-blue-700'>consumed</strong> values
						</p>
					),
					firstIntention: OFFENSIVE,
					specialRule: (
						<p>
							When any intention card is discarded, Madman{' '}
							<strong className='text-blue-700'>Consume</strong> it.{' '}
							<span className='text-xs thin-light italic'>
								(set consumed cards aside)
							</span>
						</p>
					),
					actions: [
						{
							intention: OFFENSIVE,
							values: [0],
							content: (
								<p>
									Attack X (R 1, X ={' '}
									<strong className='text-blue-700'>consumed</strong> values).
								</p>
							),
						},
						{
							intention: OFFENSIVE,
							values: [1, 2, 3, 4, 5, 6],
							content: (
								<p>
									Move 1. Attack X (R 1, X ={' '}
									<strong className='text-blue-700'>consumed</strong> values).
									<br />
									If <strong className='text-blue-700'>consumed</strong> values
									is 15 or more: Move 2.
								</p>
							),
						},
						{
							intention: DEFENSIVE,
							values: [0],
							content: (
								<p>
									Heal same amount of{' '}
									<strong className='text-blue-700'>consumed</strong> values.
								</p>
							),
						},
						{
							intention: DEFENSIVE,
							values: [1, 2, 3, 4, 5, 6],
							content: (
								<p>
									Move 1. <br />
									Heal same amount of{' '}
									<strong className='text-blue-700'>consumed</strong> values.
									<br />
									Draw and discard 2 Defensive intention cards.
								</p>
							),
						},
						{
							intention: SPECIAL,
							values: ['A', 'B', 'C', 'D'],
							content: <p>Jump 2.</p>,
						},
					],
				},
				{
					name: 'Madman',
					lv: NORMAL,
					imageSrc: '/images/ks/monster-madman.png',
					hp: (
						<p>
							40 + <strong className='text-blue-700'>consumed</strong> values
						</p>
					),
					firstIntention: OFFENSIVE,
					actions: [
						{
							intention: OFFENSIVE,
							values: [0],
							content: (
								<p>
									Attack X (R 1, X ={' '}
									<strong className='text-blue-700'>consumed</strong> values).
								</p>
							),
						},
						{
							intention: OFFENSIVE,
							values: [1, 2, 3, 4, 5, 6],
							content: (
								<p>
									Move 1. Attack X (R 1, X ={' '}
									<strong className='text-blue-700'>consumed</strong> values).
									<br />
									If <strong className='text-blue-700'>consumed</strong> values
									is 15 or more: Move 2.
								</p>
							),
						},
						{
							intention: DEFENSIVE,
							values: [0],
							content: (
								<p>
									Heal same amount of{' '}
									<strong className='text-blue-700'>consumed</strong> values.
								</p>
							),
						},
						{
							intention: DEFENSIVE,
							values: [1, 2, 3],
							content: (
								<p>
									Move 1. <br />
									Heal same amount of{' '}
									<strong className='text-blue-700'>consumed</strong> values.
									<br />
									Draw and discard 2 Defensive intention cards.
								</p>
							),
						},
						{
							intention: DEFENSIVE,
							values: [4, 5, 6],
							content: (
								<p>
									Move 1. <br />
									All monsters gain Blocks equals to{' '}
									<strong className='text-blue-700'>consumed</strong> values.
									<br />
									Draw and discard 2 Defensive intention cards.
								</p>
							),
						},
						{
							intention: SPECIAL,
							values: ['A', 'B', 'C', 'D'],
							content: <p>Jump 2.</p>,
						},
					],
				},
				{
					name: 'Madman',
					lv: ADVANCED,
					imageSrc: '/images/ks/monster-madman.png',
					hp: '65',
					firstIntention: OFFENSIVE,
					actions: [
						{
							intention: OFFENSIVE,
							values: [0],
							content: (
								<p>
									Attack X (R 1, X ={' '}
									<strong className='text-blue-700'>consumed</strong> values).
								</p>
							),
						},
						{
							intention: OFFENSIVE,
							values: [1, 2, 3],
							content: (
								<p>
									Move 1. Attack X (R 1, X ={' '}
									<strong className='text-blue-700'>consumed</strong> values).
									<br />
									If <strong className='text-blue-700'>consumed</strong> values
									is 15 or more: Move 2.
								</p>
							),
						},
						{
							intention: OFFENSIVE,
							values: [4, 5, 6],
							content: (
								<p>
									Move 1. Deal total X damages to players, distribute evenly. (X
									= <strong className='text-blue-700'>consumed</strong> values).
									<br />
									If <strong className='text-blue-700'>consumed</strong> values
									is 15 or more: Move 2.
								</p>
							),
						},
						{
							intention: DEFENSIVE,
							values: [0],
							content: (
								<p>
									Heal same amount of{' '}
									<strong className='text-blue-700'>consumed</strong> values.
								</p>
							),
						},
						{
							intention: DEFENSIVE,
							values: [1, 2, 3],
							content: (
								<p>
									Move 1. <br />
									Heal same amount of{' '}
									<strong className='text-blue-700'>consumed</strong> values.
									<br />
									Draw and discard 2 Defensive intention cards.
								</p>
							),
						},
						{
							intention: DEFENSIVE,
							values: [4, 5, 6],
							content: (
								<p>
									Move 1. <br />
									All monsters gain Blocks equals to{' '}
									<strong className='text-blue-700'>consumed</strong> values.
									<br />
									Draw and discard 2 Defensive intention cards.
								</p>
							),
						},
						{
							intention: SPECIAL,
							values: ['A', 'B'],
							content: <p>Jump 2.</p>,
						},
						{
							intention: SPECIAL,
							values: ['C', 'D'],
							content: <p>Pull 2 (R 1-3).</p>,
						},
					],
				},
				{
					name: 'Madman',
					lv: ELITE,
					imageSrc: '/images/ks/monster-madman.png',
					hp: (
						<p>
							50 + <strong className='text-blue-700'>consumed</strong> values
						</p>
					),
					firstIntention: OFFENSIVE,
					actions: [
						{
							intention: OFFENSIVE,
							values: [0, 1, 2, 3],
							content: (
								<p>
									<span className='text-red-700'>
										If <strong className='text-blue-700'>consumed</strong>{' '}
										values is 8 or more: Move 2 and ignore Disarm.
										<br />
									</span>
									Move 1. Attack X (R 1, X ={' '}
									<strong className='text-blue-700'>consumed</strong> values).
								</p>
							),
						},
						{
							intention: OFFENSIVE,
							values: [4, 5, 6],
							content: (
								<p>
									Move 1. Deal total X damages to players, distribute evenly. (X
									= <strong className='text-blue-700'>consumed</strong> values).
									<br />
									If <strong className='text-blue-700'>consumed</strong> values
									is <span className='text-red-700'>8 or more</span> : Move 2.
								</p>
							),
						},
						{
							intention: DEFENSIVE,
							values: [0, 1, 2, 3],
							content: (
								<p>
									Move 1. <br />
									Heal same amount of{' '}
									<strong className='text-blue-700'>consumed</strong> values.
									<br />
									Draw and discard <span className='text-red-700'>4</span>{' '}
									Defensive intention cards.
								</p>
							),
						},
						{
							intention: DEFENSIVE,
							values: [4, 5, 6],
							content: (
								<p>
									Move 1. <br />
									All monsters gain Blocks equals to{' '}
									<strong className='text-blue-700'>consumed</strong> values.
									<br />
									Draw and discard <span className='text-red-700'>4</span>{' '}
									Defensive intention cards.
								</p>
							),
						},
						{
							intention: SPECIAL,
							values: ['A'],
							content: <p>Jump 2</p>,
						},
						{
							intention: SPECIAL,
							values: ['B'],
							content: <p>Pull 2 (R 1-3)</p>,
						},
						{
							intention: SPECIAL,
							values: ['C'],
							content: <p>Jump 6 Until fartest reachable player</p>,
						},
						{
							intention: SPECIAL,
							values: ['D'],
							content: <p>Pull 6 (R 7-1)</p>,
						},
					],
				},
				{
					name: 'Master',
					lv: MINOR,
					imageSrc: '/images/ks/monster-master.png',
					hp: '18',
					firstIntention: OFFENSIVE,
					actions: [
						{
							intention: OFFENSIVE,
							values: [0, 1, 2, 3, 4, 5, 6],
							content: (
								<p>
									Block 5. Another closet monster activate Offense X (X =
									current intention value). If no other monster: Flee.
								</p>
							),
						},
						{
							intention: DEFENSIVE,
							values: [0, 1, 2, 3, 4, 5, 6],
							content: (
								<p>
									Block 5. Another closet monster activate current Defense X (X
									= current intention value). If no other monster: Flee.
								</p>
							),
						},
						{
							intention: SPECIAL,
							values: ['A', 'B', 'C', 'D'],
							content: (
								<p>
									Block 5. Another closet monster activate current Special X (X
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
							values: [0, 1, 2, 3, 4, 5, 6],
							content: (
								<p>
									Block 5. Another closet monster activate Offense X (X =
									current intention value). If no other monster: Flee.
								</p>
							),
						},
						{
							intention: DEFENSIVE,
							values: [0, 1, 2, 3],
							content: (
								<p>
									Block 5. Another closet monster activate current Defense X (X
									= current intention value). If no other monster: Flee.
								</p>
							),
						},
						{
							intention: DEFENSIVE,
							values: [4, 5, 6],
							content: (
								<p>
									Block 5. Another closet monster prepare a Defense intention
									card. If no other monster: Flee.
								</p>
							),
						},
						{
							intention: SPECIAL,
							values: ['A', 'B', 'C', 'D'],
							content: (
								<p>
									Block 5. Another closet monster activate current Special X (X
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
							values: [0, 1, 2, 3],
							content: (
								<p>
									Block 5. Another closet monster activate Offense X (X =
									current intention value). If no other monster: Flee.
								</p>
							),
						},
						{
							intention: OFFENSIVE,
							values: [4, 5, 6],
							content: (
								<p>
									Block 5. Another closet monster prepare a Offense intention
									card. If no other monster: Flee.
								</p>
							),
						},
						{
							intention: DEFENSIVE,
							values: [0, 1, 2, 3],
							content: (
								<p>
									Block 5. Another closet monster activate current Defense X (X
									= current intention value). If no other monster: Flee.
								</p>
							),
						},
						{
							intention: DEFENSIVE,
							values: [4, 5, 6],
							content: (
								<p>
									Block 5. Another closet monster prepare a Defense intention
									card. If no other monster: Flee.
								</p>
							),
						},
						{
							intention: SPECIAL,
							values: ['A', 'B'],
							content: (
								<p>
									Block 5. Another closet monster activate current Special X (X
									= current intention value). If no other monster: Flee.
								</p>
							),
						},
						{
							intention: SPECIAL,
							values: ['C', 'D'],
							content: (
								<p>
									Block 5. Another closet monster prepare a Special intention
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
					firstIntention: OFFENSIVE,
					actions: [
						{
							intention: OFFENSIVE,
							values: [0, 1, 2, 3],
							content: (
								<p>
									Block 5. Another closet monster heals 5 and activate Offense X
									(X = current intention value). If no other monster: Flee.
								</p>
							),
						},
						{
							intention: OFFENSIVE,
							values: [4, 5, 6],
							content: (
								<p>
									Block 5. Another closet monster heals 5 and prepare a Offense
									intention card. If no other monster: Flee.
								</p>
							),
						},
						{
							intention: DEFENSIVE,
							values: [0, 1, 2, 3],
							content: (
								<p>
									Block 5. Another closet monster heals 5 and activate current
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
									Block 5. Another closet monster heals 5 and prepare a Defense
									intention card. If no other monster: Flee.
								</p>
							),
						},
						{
							intention: SPECIAL,
							values: ['A', 'B'],
							content: (
								<p>
									Block 5. Another closet monster heals 5 and activate current
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
									Block 5. Another closet monster heals 5 and prepare a Special
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
										className='flex-none text-center py-1 rounded-t border-t-4 border-r-4 border-l-4'
										style={{
											background: 'rgba(255, 255, 255, 0.8)',
											borderColor: RESOURCES[monster.lv].color,
										}}
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

				<div className='mt-8'>
					<div
						style={{
							width: 442,
							border: '12px solid #333',
							borderRadius: 8,
						}}
						className='p-2'
					>
						<h3>Madman Special Rules:</h3>
						<p>
							When any intention card is discarded, Madman{' '}
							<strong className='text-blue-700'>consumes</strong> it instead.
							Set <strong className='text-blue-700'>consumed</strong> cards
							aside.
						</p>
						<p>
							When player deals damages to Madman, instead of reducing HP, it
							may choose to return{' '}
							<strong className='text-blue-700'>consumed</strong> card with same
							value back to its pile, which that card is no longer being{' '}
							<strong className='text-blue-700'>consumed</strong>.
						</p>
						<p>
							<strong className='text-blue-700'>Consumed</strong> values = sum
							of intention values of all{' '}
							<strong className='text-blue-700'>consumed</strong> cards. Special
							intention card value is counted as 6.
						</p>
					</div>
				</div>
			</div>
		</>
	)
}

export default KsMonstersPage
