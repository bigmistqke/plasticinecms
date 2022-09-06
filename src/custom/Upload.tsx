import { createEffect, createSignal, For, JSXElement, Show } from 'solid-js'
import { Dynamic } from 'solid-js/web'
import { register } from '../plasticine'
import uploadFile from '../plasticine/helpers/uploadFile'
import { s_button, s_inactiveButton } from '../plasticine/components/styles'
import { BsArrowRepeat, BsXLg } from 'solid-icons/bs'
import { ProgressData } from '../plasticine/components/types'

interface ThumbnailProps {
	class: string
	src: string
}

const Thumbnail = (props: { file: File }) => {
	const filetypes: { [key: string]: (props: ThumbnailProps) => JSXElement } = {
		mov: (props) => <video {...props} />,
		mp4: (props) => <video {...props} />,
		jpg: (props) => <img {...props} />,
		jpeg: (props) => <img {...props} />,
		png: (props) => <img {...props} />,
	}

	const extension = () => props.file.name.split('.').slice(1)[0].toLowerCase()

	return extension() in filetypes ? (
		<Dynamic
			component={filetypes[extension()]}
			class="w-16 h-16 object-cover rounded-full shrink-0"
			src={URL.createObjectURL(props.file)}
		/>
	) : (
		<div class="w-16 h-16 object-fill rounded-full shrink-0 bg-slate-400"></div>
	)
}

const Progress = (props: ProgressData) => {
	const getProgressMessage = () => {
		if (props.message) return props.message
		if (!props.loaded || !props.total) return 'initializing...'
		if (props.loaded / props.total >= 1) return 'completed!'
		return `${props.loaded} / ${props.total}`
	}

	return (
		<div class="rounded-xl h-6 w-32 relative flex overflow-hidden self-center">
			<span class={`absolute z-10 w-full text-center self-center text-xs ${props.message ? 'text-red-500' : ''}`}>
				{getProgressMessage()}
			</span>
			<span
				class="absolute left-0 top-0 h-full bg-slate-200 "
				style={{ width: (props.alpha ? props.alpha * 100 : 0) + '%' }}
			/>
		</div>
	)
}

const Upload = (props: { oninput: (filenames: string[]) => void }) => {
	const [file, setFile] = createSignal<File>()
	let input: HTMLInputElement | undefined

	const [progressData, setProgressData] = createSignal<ProgressData>()
	const [completed, setCompleted] = createSignal(false)
	const [progressHidden, setProgressHidden] = createSignal(false)

	const [error, setError] = createSignal<undefined | string>()

	const upload = (file: File | undefined) => {
		if (!file) return
		setError(undefined)
		setCompleted(false)
		uploadFile({
			file: file,
			onprogress: (p) => setProgressData(p),
			onerror: (msg) => setError(msg),
			onsuccess: (msg) => {
				setCompleted(true)
				setTimeout(() => {
					setProgressHidden(true)
				}, 2000)
			},
		})
	}

	const processInput = (fileList: FileList) => {
		const file = Array.from(fileList)[0]
		setFile(file)
		upload(file)
	}

	return (
		<>
			<input
				ref={input}
				type="file"
				hidden
				oninput={(e: Event) => {
					const files = (e.target as HTMLInputElement).files
					if (files) processInput(files)
				}}
			/>
			<div class={`flex gap-4 h-16`}>
				<button class={`${s_button} text-xl self-center`} onclick={() => input?.click()}>
					upload
				</button>
				<Show when={file()}>
					<Thumbnail file={file() as File} />
					<span class="flex-1 text-xs self-center">{file()?.name}</span>
					<Show when={!progressHidden()}>
						<Progress
							message={error()}
							loaded={progressData()?.loaded}
							total={progressData()?.total}
							alpha={progressData()?.alpha}
						/>
					</Show>

					{error() ? (
						<button class={`self-center p-2 rounded-full ${s_button}`} onclick={() => upload(file())}>
							<BsArrowRepeat size={21} />
						</button>
					) : (
						<button
							class={`self-center p-2 rounded-full ${
								completed() || error() ? s_button : s_inactiveButton
							}`}
						>
							<BsXLg size={21} />
						</button>
					)}
				</Show>
			</div>
		</>
	)
}

export default register(Upload, 'string')
