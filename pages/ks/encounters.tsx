import { useMemo } from 'react'

const KsEncountersPage = () => {
	const encounters = [
		{
			tier: '1',
			characters: [
				undefined,
				{ initiative: 7, isPlayer: true, name: 'D', face: 'right' },
				{ initiative: 5, isPlayer: true, name: 'C', face: 'right' },
				{ initiative: 3, isPlayer: true, name: 'B', face: 'right' },
				{ initiative: 1, isPlayer: true, name: 'A', face: 'right' },
				undefined,
				{
					initiative: 6,
					name: 'Tank',
					image: '/images/ks/monster-tank.png',
					face: 'left',
				},
				{
					initiative: 4,
					name: 'Thug',
					image: '/images/ks/monster-thug.png',
					face: 'left',
				},
				{
					initiative: 2,
					name: 'Archer',
					image: '/images/ks/monster-archer.png',
					face: 'left',
				},
				undefined,
				undefined,
			],
		},
		{
			tier: '1',
			characters: [
				undefined,
				{ initiative: 7, isPlayer: true, name: 'D', face: 'right' },
				{ initiative: 5, isPlayer: true, name: 'C', face: 'right' },
				{ initiative: 3, isPlayer: true, name: 'B', face: 'right' },
				{ initiative: 1, isPlayer: true, name: 'A', face: 'right' },
				undefined,
				{
					initiative: 6,
					name: 'Thug',
					image: '/images/ks/monster-thug.png',
					face: 'left',
				},
				{
					initiative: 4,
					name: 'Flyer',
					image: '/images/ks/monster-flyer.png',
					face: 'left',
				},
				{
					initiative: 2,
					name: 'Bomber',
					image: '/images/ks/monster-bomber.png',
					face: 'left',
				},
				undefined,
				undefined,
			],
		},
		{
			tier: '1',
			characters: [
				undefined,
				{ initiative: 7, isPlayer: true, name: 'D', face: 'right' },
				{ initiative: 5, isPlayer: true, name: 'C', face: 'right' },
				{ initiative: 3, isPlayer: true, name: 'B', face: 'right' },
				{ initiative: 1, isPlayer: true, name: 'A', face: 'right' },
				undefined,
				{
					initiative: 6,
					name: 'Tank',
					image: '/images/ks/monster-tank.png',
					face: 'left',
				},
				{
					initiative: 4,
					name: 'Archer',
					image: '/images/ks/monster-archer.png',
					face: 'left',
				},
				{
					initiative: 2,
					name: 'Flyer',
					image: '/images/ks/monster-flyer.png',
					face: 'left',
				},
				{
					initiative: 8,
					name: 'Doctor',
					image: '/images/ks/monster-doctor.png',
					face: 'left',
				},
				undefined,
			],
		},
		{
			tier: '1',
			characters: [
				undefined,
				{ initiative: 7, isPlayer: true, name: 'D', face: 'right' },
				{ initiative: 5, isPlayer: true, name: 'C', face: 'right' },
				{ initiative: 3, isPlayer: true, name: 'B', face: 'right' },
				{ initiative: 1, isPlayer: true, name: 'A', face: 'right' },
				undefined,
				{
					initiative: 6,
					name: 'Thug',
					image: '/images/ks/monster-thug.png',
					face: 'left',
				},
				{
					initiative: 4,
					name: 'Bomber',
					image: '/images/ks/monster-bomber.png',
					face: 'left',
				},
				{
					initiative: 2,
					name: 'Flyer',
					image: '/images/ks/monster-flyer.png',
					face: 'left',
				},
				{
					initiative: 8,
					name: 'Doctor',
					image: '/images/ks/monster-doctor.png',
					face: 'left',
				},
				undefined,
			],
		},
		{
			tier: '1',
			characters: [
				{
					initiative: 7,
					name: 'Thug',
					image: '/images/ks/monster-thug.png',
					face: 'right',
				},
				undefined,
				undefined,
				{ initiative: 6, isPlayer: true, name: 'D', face: 'right' },
				{ initiative: 5, isPlayer: true, name: 'C', face: 'right' },
				{ initiative: 3, isPlayer: true, name: 'B', face: 'right' },
				{ initiative: 1, isPlayer: true, name: 'A', face: 'right' },
				undefined,
				{
					initiative: 2,
					name: 'Thug',
					image: '/images/ks/monster-thug.png',
					face: 'left',
				},
				undefined,
				{
					initiative: 4,
					name: 'Doctor',
					image: '/images/ks/monster-doctor.png',
					face: 'left',
				},
			],
		},
		{
			tier: '1',
			characters: [
				{
					initiative: 8,
					name: 'Archer',
					image: '/images/ks/monster-archer.png',
					face: 'right',
				},
				{
					initiative: 6,
					name: 'Tank',
					image: '/images/ks/monster-tank.png',
					face: 'right',
				},
				undefined,
				{ initiative: 5, isPlayer: true, name: 'D', face: 'right' },
				{ initiative: 7, isPlayer: true, name: 'C', face: 'right' },
				{ initiative: 3, isPlayer: true, name: 'B', face: 'right' },
				{ initiative: 1, isPlayer: true, name: 'A', face: 'right' },
				undefined,
				{
					initiative: 2,
					name: 'Thug',
					image: '/images/ks/monster-thug.png',
					face: 'left',
				},
				undefined,
				{
					initiative: 4,
					name: 'Doctor',
					image: '/images/ks/monster-doctor.png',
					face: 'left',
				},
			],
		},
		{
			tier: 'Midboss',
			characters: [
				{
					initiative: 8,
					name: 'Archer',
					image: '/images/ks/monster-archer.png',
					face: 'right',
				},
				undefined,
				{ initiative: 4, isPlayer: true, name: 'D', face: 'right' },
				{ initiative: 5, isPlayer: true, name: 'C', face: 'right' },
				{
					initiative: 6,
					name: 'Flyer',
					image: '/images/ks/monster-flyer.png',
					face: 'left',
				},
				undefined,
				{ initiative: 2, isPlayer: true, name: 'B', face: 'right' },
				{ initiative: 1, isPlayer: true, name: 'A', face: 'right' },
				undefined,
				{
					initiative: 3,
					name: 'Thug',
					image: '/images/ks/monster-thug.png',
					face: 'left',
				},
				{
					initiative: 7,
					name: 'Master',
					image: '/images/ks/monster-master.png',
					face: 'left',
				},
			],
		},
		{
			tier: 'Midboss',
			characters: [
				{ initiative: 7, isPlayer: true, name: 'D', face: 'right' },
				{ initiative: 5, isPlayer: true, name: 'C', face: 'right' },
				{ initiative: 3, isPlayer: true, name: 'B', face: 'right' },
				{ initiative: 1, isPlayer: true, name: 'A', face: 'right' },
				undefined,
				{
					initiative: 2,
					name: 'Tank',
					image: '/images/ks/monster-tank.png',
					face: 'left',
				},
				{
					initiative: 4,
					name: 'Thug',
					image: '/images/ks/monster-thug.png',
					face: 'left',
				},
				{
					initiative: 6,
					name: 'Archer',
					image: '/images/ks/monster-archer.png',
					face: 'left',
				},
				undefined,
				undefined,
				{
					initiative: 8,
					name: 'Master',
					image: '/images/ks/monster-master.png',
					face: 'left',
				},
			],
		},
		{
			tier: 'Midboss',
			characters: [
				undefined,
				{
					initiative: 8,
					name: 'Bomber',
					image: '/images/ks/monster-bomber.png',
					face: 'right',
				},
				{
					initiative: 4,
					name: 'Flyer',
					image: '/images/ks/monster-flyer.png',
					face: 'right',
				},
				undefined,
				{ initiative: 5, isPlayer: true, name: 'D', face: 'right' },
				{ initiative: 6, isPlayer: true, name: 'C', face: 'right' },
				{ initiative: 2, isPlayer: true, name: 'B', face: 'right' },
				{ initiative: 1, isPlayer: true, name: 'A', face: 'right' },
				{
					initiative: 3,
					name: 'Tank',
					image: '/images/ks/monster-tank.png',
					face: 'left',
				},
				undefined,
				{
					initiative: 7,
					name: 'Master',
					image: '/images/ks/monster-master.png',
					face: 'left',
				},
			],
		},
		{
			tier: '2',
			characters: [
				{
					initiative: 8,
					name: 'Docter',
					image: '/images/ks/monster-doctor.png',
					face: 'right',
				},
				{
					initiative: 3,
					name: 'Thug',
					image: '/images/ks/monster-thug.png',
					face: 'right',
				},
				undefined,
				undefined,
				{ initiative: 1, isPlayer: true, name: 'D', face: 'right' },
				{ initiative: 5, isPlayer: true, name: 'C', face: 'right' },
				{
					initiative: 7,
					name: 'Flyer',
					image: '/images/ks/monster-flyer.png',
					face: 'left',
				},
				{ initiative: 6, isPlayer: true, name: 'B', face: 'right' },
				{ initiative: 2, isPlayer: true, name: 'A', face: 'right' },
				undefined,
				{
					initiative: 4,
					name: 'Thug',
					image: '/images/ks/monster-thug.png',
					face: 'left',
				},
			],
		},
		{
			tier: '2',
			characters: [
				{ initiative: 4, isPlayer: true, name: 'D', face: 'right' },
				{ initiative: 2, isPlayer: true, name: 'B', face: 'right' },
				{
					initiative: 7,
					name: 'tank',
					image: '/images/ks/monster-tank.png',
					face: 'left',
				},
				undefined,
				{
					initiative: 3,
					name: 'Bomber',
					image: '/images/ks/monster-bomber.png',
					face: 'left',
				},
				undefined,
				{
					initiative: 8,
					name: 'Thug',
					image: '/images/ks/monster-thug.png',
					face: 'right',
				},
				undefined,
				{
					initiative: 4,
					name: 'Tank',
					image: '/images/ks/monster-tank.png',
					face: 'right',
				},
				{ initiative: 6, isPlayer: true, name: 'C', face: 'right' },
				{ initiative: 2, isPlayer: true, name: 'A', face: 'right' },
			],
		},
		{
			tier: 'Boss',
			characters: [
				{
					initiative: 8,
					name: 'Doctor',
					image: '/images/ks/monster-doctor.png',
					face: 'right',
				},
				{
					initiative: 3,
					name: 'Flyer',
					image: '/images/ks/monster-flyer.png',
					face: 'right',
				},
				undefined,
				{ initiative: 1, isPlayer: true, name: 'D', face: 'right' },
				{ initiative: 6, isPlayer: true, name: 'C', face: 'right' },
				{ initiative: 5, isPlayer: true, name: 'B', face: 'right' },
				{ initiative: 2, isPlayer: true, name: 'A', face: 'right' },
				undefined,
				{
					initiative: 7,
					name: 'Madman',
					image: '/images/ks/monster-madman.png',
					face: 'left',
				},
				undefined,
				{
					initiative: 4,
					name: 'Master',
					image: '/images/ks/monster-master.png',
					face: 'left',
				},
			],
		},
	]

	return (
		<>
			<div className='px-8 py-24'>
				<div className='flex flex-wrap mb-16' style={{ width: '350%' }}>
					{encounters.map((encounter, encounterI) => (
						<div
							key={encounterI}
							className='flex flex-col items-stretch p-8 pt-4'
							style={{
								backgroundImage: `url('/images/ks/encounter-bg.png')`,
								backgroundSize: 'cover',
								backgroundPosition: 'center bottom',
								backgroundRepeat: 'no-repeat',
								width: 1100,
								height: 300,
							}}
						>
							<div className='mb-4 pl-2 text-2xl bg-white bg-opacity-70'>
								Tier {encounter.tier}
							</div>
							<div className='flex-1 flex gap-x-2'>
								{encounter.characters.map((character, characterI) => {
									if (!character) {
										return (
											<div
												key={characterI}
												className='flex-1 flex flex-col gap-y-4 items-center'
											>
												<div className='border border-white h-12 w-12'></div>
												<div className='border border-white flex-1 self-stretch'></div>
											</div>
										)
									}

									return (
										<div
											key={characterI}
											className='flex-1 flex flex-col gap-y-4 items-center'
										>
											<div
												className='border border-white h-12 w-12 bg-black text-white text-3xl text-center'
												style={{ lineHeight: '3rem' }}
											>
												{character.initiative}
											</div>
											<div
												className='border border-white flex-1 self-stretch bg-cover bg-black text-white text-5xl text-center pt-12'
												style={{
													backgroundImage: character.isPlayer
														? ''
														: `url('${character.image}')`,
													transform:
														character.face === 'right' && character.image
															? 'scaleX(-1)'
															: '',
												}}
											>
												{character.isPlayer && character.name}
											</div>
										</div>
									)
								})}
							</div>
						</div>
					))}
				</div>
			</div>
		</>
	)
}

export default KsEncountersPage
