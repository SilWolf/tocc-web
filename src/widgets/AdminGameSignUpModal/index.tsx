import React, { useCallback, useMemo, useState } from 'react'

import Modal, { ModalProps } from 'src/components/Modal'
import Badge from 'src/components/Badge'
import {
	Game,
	GAME_SIGN_UP_STATUS,
	GameSignUp,
	GameSignUpIdAndStatus,
} from 'src/types/Game.type'

import StrapiImg from '../StrapiImg'
import classNames from 'classnames'

type ResponseType = {
	label: string
	value: GAME_SIGN_UP_STATUS
	isPositive: boolean
}
const RESPONSES: ResponseType[] = [
	{
		label: '接受報名',
		value: GAME_SIGN_UP_STATUS.ACCEPTED,
		isPositive: true,
	},
	{
		label: '拒絕:人數已滿',
		value: GAME_SIGN_UP_STATUS.REJECTED_FULL,
		isPositive: false,
	},
	{
		label: '拒絕:等級不符',
		value: GAME_SIGN_UP_STATUS.REJECTED_INVALID_LEVEL,
		isPositive: false,
	},
	{
		label: '拒絕:城市不符',
		value: GAME_SIGN_UP_STATUS.REJECTED_INVALID_CITY,
		isPositive: false,
	},
	{
		label: '拒絕:非優先',
		value: GAME_SIGN_UP_STATUS.REJECTED_NOT_PRIORITIZE,
		isPositive: false,
	},
]

enum WARNING_KEY {
	LEVEL_TOO_LOW,
	LEVEL_TOO_HIGH,
	CITY_NOT_MATCH,
}

const WARNING: Record<WARNING_KEY, string> = {
	[WARNING_KEY.LEVEL_TOO_LOW]: '等級太低',
	[WARNING_KEY.LEVEL_TOO_HIGH]: '等級太高',
	[WARNING_KEY.CITY_NOT_MATCH]: '城市不符',
}

type GameSignUpDTO = GameSignUp & {
	warnings: WARNING_KEY[]
}

type Props = ModalProps & {
	game: Game
	gameSignUps: GameSignUp[]
	onOk: (gameSignUps: GameSignUpIdAndStatus[]) => void
	onCancel: () => void
}

const AdminGameSignUpModal = ({
	game,
	gameSignUps: _gameSignUps,
	onOk,
	onCancel,
	...others
}: Props): JSX.Element => {
	const gameSignUps = useMemo<GameSignUpDTO[]>(() => {
		return _gameSignUps.map<GameSignUpDTO>((gameSignUp) => {
			const warnings = []

			const { character } = gameSignUp

			if (character.level) {
				if (character.level < (game.lvMin || 1)) {
					warnings.push(WARNING_KEY.LEVEL_TOO_LOW)
				} else if (character.level > (game.lvMax || 99)) {
					warnings.push(WARNING_KEY.LEVEL_TOO_HIGH)
				}
			}

			if (character.city !== game.city?.id) {
				warnings.push(WARNING_KEY.CITY_NOT_MATCH)
			}

			return {
				...gameSignUp,
				warnings,
			}
		})
	}, [_gameSignUps, game.city?.id, game.lvMax, game.lvMin])

	const [responseMap, setResponseMap] = useState<
		Record<string, ResponseType | undefined>
	>(
		gameSignUps.reduce<Record<string, undefined>>((prev, gameSignUp) => {
			prev[gameSignUp.id] = undefined
			return prev
		}, {})
	)
	const [showDoubleConfirmModal, setShowDoubleConfirmModal] =
		useState<boolean>(false)

	const handleChangeGameSignUpResponse = useCallback(
		(gameSignUp: GameSignUp, event: React.ChangeEvent<HTMLSelectElement>) => {
			const response = RESPONSES.find(
				(response) => response.value === event.target.value
			)
			setResponseMap((prev) => ({
				...prev,
				[gameSignUp.id]: response,
			}))
		},
		[]
	)

	const handleCancelDoubleConfirm = useCallback(() => {
		setShowDoubleConfirmModal(false)
	}, [])

	const handleOkDoubleConfirm = useCallback(() => {
		setShowDoubleConfirmModal(false)
		onOk(
			Object.entries(responseMap).map<GameSignUpIdAndStatus>(
				([gameSignUpId, response]) => ({
					id: gameSignUpId,
					status: response?.value || GAME_SIGN_UP_STATUS.PENDING,
				})
			)
		)
	}, [onOk, responseMap])

	const handleNext = useCallback(() => {
		setShowDoubleConfirmModal(true)
	}, [])

	const handleCancel = useCallback(() => {
		onCancel?.()
	}, [onCancel])

	const [doubleConfirmCheckboxValue, setDoubleConfirmCheckboxValue] =
		useState<boolean>(false)

	return (
		<>
			<Modal {...others}>
				<div className='space-y-4'>
					<p>
						你即將選定玩家及截止報名。
						<br />
						以下玩家以報名順序排列，請為每個玩家選一項動作。
					</p>

					<div className='space-y-2'>
						{gameSignUps.map((gameSignUp) => {
							const { character, player, warnings } = gameSignUp
							return (
								<div
									key={gameSignUp.id}
									className={classNames(
										'p-2 rounded flex items-center gap-x-2',
										responseMap[gameSignUp.id]?.isPositive === true
											? 'bg-accepted text-white'
											: responseMap[gameSignUp.id]?.isPositive === false
											? 'bg-pending'
											: 'bg-gray-200'
									)}
								>
									<div>
										<StrapiImg
											className={classNames('w-10 h-10')}
											image={character.portraitImage}
											size='thumbnail'
											alt=''
										/>
									</div>
									<div className='flex-1'>
										<p className='text-normal leading-4'>
											{character.code} {character.name}
										</p>
										<p className='text-xs leading-3 opacity-80'>
											{player.code} {player.name}
										</p>
										<p className='text-xs leading-3 opacity-80'>
											Lv.{character.level} ({character.levelWithClsesString})
										</p>
									</div>
									<div className='space-x-1'>
										{warnings.map((warningKey) => (
											<Badge key={warningKey} type='warning'>
												{WARNING[warningKey]}
											</Badge>
										))}
									</div>
									<div>
										<select
											className='text-black'
											onChange={(event) =>
												handleChangeGameSignUpResponse(gameSignUp, event)
											}
										>
											<option value='' disabled selected>
												動作
											</option>
											{RESPONSES.map((response) => (
												<option key={response.value} value={response.value}>
													{response.label}
												</option>
											))}
										</select>
									</div>
								</div>
							)
						})}
					</div>

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
							onClick={handleNext}
						>
							下一步
						</button>
					</div>
				</div>
			</Modal>

			<Modal
				open={showDoubleConfirmModal}
				className='w-auto max-w-screen-tablet mx-auto'
			>
				<div className='space-y-4'>
					<p>
						請再次確認以下名單正確無誤，一經 <strong>確定</strong>
						，系統就會向各玩家發出通知。
					</p>

					{showDoubleConfirmModal &&
						gameSignUps
							.filter(
								(gameSignUp) =>
									responseMap[gameSignUp.id]?.value ===
									GAME_SIGN_UP_STATUS.ACCEPTED
							)
							.map((gameSignUp) => {
								const { character, player, warnings } = gameSignUp
								return (
									<div
										key={gameSignUp.id}
										className={'p-2 rounded flex items-center gap-x-2'}
									>
										<div>
											<StrapiImg
												className={classNames('w-10 h-10')}
												image={character.portraitImage}
												size='thumbnail'
												alt=''
											/>
										</div>
										<div className='flex-1'>
											<p className='text-normal leading-4'>
												{character.code} {character.name}
											</p>
											<p className='text-xs leading-3 opacity-80'>
												{player.code} {player.name}
											</p>
											<p className='text-xs leading-3 opacity-80'>
												Lv.{character.level} ({character.levelWithClsesString})
											</p>
										</div>
										<div className='space-x-1'>
											{warnings.map((warningKey) => (
												<Badge key={warningKey} type='warning'>
													{WARNING[warningKey]}
												</Badge>
											))}
										</div>
									</div>
								)
							})}
					<div className='text-center'>
						<label htmlFor='confirm'>
							<input
								type='checkbox'
								id='confirm'
								checked={doubleConfirmCheckboxValue}
								onChange={() => {
									setDoubleConfirmCheckboxValue((prev) => !prev)
								}}
							/>
							<span> 我確認玩家名單無誤</span>
						</label>
					</div>
					<div className='text-center space-x-2 mt-4'>
						<button
							data-ripplet
							type='button'
							className='button'
							onClick={handleCancelDoubleConfirm}
						>
							取消
						</button>
						<button
							type='button'
							className='button button-primary'
							onClick={handleOkDoubleConfirm}
							disabled={!doubleConfirmCheckboxValue}
						>
							確認報名及截止
						</button>
					</div>
				</div>
			</Modal>
		</>
	)
}

export default AdminGameSignUpModal
