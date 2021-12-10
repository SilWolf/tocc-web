import React, { useCallback, useRef, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import ReactCrop, { Crop } from 'react-image-crop'

import Modal from 'src/components/Modal'
import styles from './ImageUploader.module.css'

type Props = React.HTMLAttributes<HTMLDivElement> & {
	onSubmit: (blob: Blob) => void
}

const ImageUploader = ({ children, onSubmit }: Props): JSX.Element => {
	const imageRef = useRef<any>()
	const [isOpenCropModal, setIsOpenCropModal] = useState<boolean>(false)
	const [cropState, setCropState] = useState<Partial<Crop>>({
		unit: 'px',
		width: 200,
		height: 200,
		x: 0,
		y: 0,
		aspect: 1 / 1,
	})
	const [cropImageSrc, setCropImageSrc] = useState<string | null>(null)

	const onDrop = useCallback((acceptedFiles) => {
		const file = acceptedFiles[0]
		if (!file) {
			return
		}

		const reader = new FileReader()
		reader.addEventListener('load', () =>
			setCropImageSrc(reader.result as string)
		)
		reader.readAsDataURL(file)

		// Do something with the files
		setIsOpenCropModal(true)
		setCropState({
			unit: 'px',
			width: 200,
			height: 200,
			x: 0,
			y: 0,
			aspect: 1 / 1,
		})
	}, [])

	const { getRootProps, getInputProps } = useDropzone({
		onDrop,
		accept: 'image/jpeg, image/png',
		maxFiles: 1,
	})

	const handleCropImageLoaded = useCallback(
		(image) => {
			imageRef.current = image
		},
		[imageRef]
	)

	const handleClickSubmit = useCallback(async () => {
		if (
			imageRef.current &&
			cropState.width !== undefined &&
			cropState.height !== undefined &&
			cropState.x !== undefined &&
			cropState.y !== undefined
		) {
			const canvas = document.createElement('canvas')
			const ctx = canvas.getContext('2d')
			if (!ctx) {
				return
			}

			const sourceImage = imageRef.current
			const pixelRatio = window.devicePixelRatio
			const scaleX = sourceImage.naturalWidth / sourceImage.width
			const scaleY = sourceImage.naturalHeight / sourceImage.height

			canvas.width = cropState.width * pixelRatio * scaleX
			canvas.height = cropState.height * pixelRatio * scaleY

			ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
			ctx.imageSmoothingQuality = 'high'

			ctx.drawImage(
				imageRef.current,
				cropState.x * scaleX,
				cropState.y * scaleY,
				cropState.width * scaleX,
				cropState.height * scaleY,
				0,
				0,
				cropState.width * scaleX,
				cropState.height * scaleY
			)

			canvas.toBlob(
				(blob) => {
					if (!blob) {
						//reject(new Error('Canvas is empty'));
						console.error('Canvas is empty')
						return
					}
					onSubmit(blob)
					setIsOpenCropModal(false)
				},
				'image/jpeg',
				1
			)
		}
	}, [cropState, onSubmit])

	return (
		<>
			<div className={styles.ImageUploader}>
				<div {...getRootProps()}>
					<input {...getInputProps()} />
					{children}
					<div className='dropzone-edit-button'>
						<i className='bi bi-pencil'></i> 更改圖片
					</div>
				</div>
			</div>
			<Modal open={isOpenCropModal} className='max-w-screen-mobile'>
				<div className='space-y-4'>
					<h5>裁切圖片</h5>
					{cropImageSrc && (
						<ReactCrop
							src={cropImageSrc}
							crop={cropState}
							onImageLoaded={handleCropImageLoaded}
							onChange={setCropState}
						/>
					)}
					<div className='text-center'>
						<button type='button' onClick={handleClickSubmit}>
							提交
						</button>
					</div>
				</div>
			</Modal>
		</>
	)
}

export default ImageUploader
