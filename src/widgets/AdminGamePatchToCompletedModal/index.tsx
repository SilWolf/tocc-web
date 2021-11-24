import React, { useCallback } from 'react'

import Modal, { ModalProps } from 'src/components/Modal'
import { Character } from 'src/types'
import {
	GameOutlineItem,
	GameOutlineRewardCharacterMap,
} from 'src/types/Game.type'

import GameOutlineAndRewardTable from '../GameOutlineAndRewardTable'

type Props = ModalProps & {
	outline: GameOutlineItem[]
	outlineRewardCharacterMap: GameOutlineRewardCharacterMap
	characters: Character[]
	onOk: () => void
	onCancel: () => void
}

const AdminGamePatchToCompletedModal = ({
	outline,
	outlineRewardCharacterMap,
	characters = [],
	onOk,
	onCancel,
	...others
}: Props): JSX.Element => {
	const handleOk = useCallback(() => {
		onOk?.()
	}, [onOk])

	const handleCancel = useCallback(() => {
		onCancel?.()
	}, [onCancel])

	return (
		<>
			<Modal {...others}>
				<div className='space-y-4'>
					<p>
						你即將結束這場劇本及派發獎勵，
						<strong>這是你修改劇本大綱及獎勵細節的最後機會</strong>。<br />
						在送出後，系統就會為各玩家計算經驗值、得到的金錢等複雜的數值。
					</p>

					<GameOutlineAndRewardTable
						outline={outline || []}
						outlineRewardCharacterMap={outlineRewardCharacterMap || {}}
						characters={characters}
						isReadOnly={true}
					/>

					<div className='text-center space-x-2'>
						<button
							data-ripplet
							type='button'
							className='button'
							onClick={handleCancel}
						>
							取消
						</button>
						<button
							data-ripplet
							type='button'
							className='button button-primary'
							onClick={handleOk}
						>
							派發獎勵
						</button>
					</div>
				</div>
			</Modal>
		</>
	)
}

export default AdminGamePatchToCompletedModal
