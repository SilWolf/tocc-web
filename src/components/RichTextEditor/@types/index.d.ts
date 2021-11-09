type CKEditorBase = any

declare module '@ckeditor/ckeditor5-react' {
	export type CKEditorProps = {
		editor: CKEditorBase
		data?: string
		onReady?: (_editor: CKEditorBase) => void
		onChange?: (event: any, _editor: CKEditorBase) => void
		onBlur?: (event: any, _editor: CKEditorBase) => void
		onFocus?: (event: any, _editor: CKEditorBase) => void
	}

	export const CKEditor: (props: CKEditorProps) => JSX.Element
}

declare module '@ckeditor/ckeditor5-build-classic' {
	const ClassicEditor: CKEditorBase
	export = ClassicEditor
}
