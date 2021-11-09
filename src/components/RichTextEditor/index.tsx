import React from 'react'

import styles from './RichTextEditor.module.css'

import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import { useDebouncedCallback } from 'use-debounce'

type Props = {
	onChange?: (value: string) => void
	value?: string
}

const RichTextEditor = ({ onChange, value }: Props): JSX.Element => {
	const handleChange = useDebouncedCallback(
		(_, editor: typeof ClassicEditor) => {
			onChange?.(editor.getData())
		},
		800
	)

	return (
		<div className={styles.RichTextEditor}>
			<CKEditor
				editor={ClassicEditor}
				onChange={handleChange}
				data={value || ''}
			/>
		</div>
	)
}

export default RichTextEditor
