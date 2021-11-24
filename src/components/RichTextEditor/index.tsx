import React, { useCallback } from 'react'

import styles from './RichTextEditor.module.css'

import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import { useDebouncedCallback } from 'use-debounce'

type Props = {
	onChange?: (value: string) => void
	value?: string
	readOnly?: boolean
}

const RichTextEditor = ({ onChange, value, readOnly }: Props): JSX.Element => {
	const handleReady = useCallback(
		(editor: typeof ClassicEditor) => {
			if (readOnly) {
				editor.isReadOnly = true
			}
		},
		[readOnly]
	)

	const handleChange = useDebouncedCallback(
		(_, editor: typeof ClassicEditor) => {
			onChange?.(editor.getData())
		},
		800
	)

	return (
		<div className={styles.RichTextEditor}>
			<CKEditor
				onReady={handleReady}
				editor={ClassicEditor}
				onChange={handleChange}
				data={value || ''}
			/>
		</div>
	)
}

export default RichTextEditor
