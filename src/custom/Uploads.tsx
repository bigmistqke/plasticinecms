import { createEffect, createSignal, For, Show } from 'solid-js'
import { Dynamic } from 'solid-js/web'
import { register } from '../plasticine'
import z from 'zod'
import uploadFile from '../plasticine/helpers/uploadFile'
import { s_button, s_inactiveButton } from '../plasticine/components/styles'
import { BsArrowRepeat, BsXLg } from 'solid-icons/bs'

const Thumbnail = (props: { file: File }) => {
	const filetypes = {
		mov: (props: { class: string; src: string }) => <video {...props} />,
		mp4: (props: { class: string; src: string }) => <video {...props} />,
		jpg: (props: { class: string; src: string }) => <img {...props} />,
		jpeg: (props: { class: string; src: string }) => <img {...props} />,
		png: (props: { class: string; src: string }) => <img {...props} />,
	}

	const extension = props.file.name.split('.').slice(1)[0].toLowerCase()

	return extension in filetypes ? (
		<Dynamic
			component={filetypes[extension]}
			class="w-16 h-16 object-fill rounded-full shrink-0"
			src={URL.createObjectURL(props.file)}
		/>
	) : (
		<div class="w-16 h-16 object-fill rounded-full shrink-0 bg-slate-400"></div>
	)
}

const Progress = (props) => {
	createEffect(() => console.log('error', props.error))

	const getProgressMessage = () => {
		if (props.error) return props.error
		if (!props.loaded) return 'initializing...'
		if (props.loaded / props.total === 1) return 'completed!'
		return `${props.loaded} / ${props.total}`
	}

	return (
		<div class="rounded-xl h-6 w-32 relative flex overflow-hidden self-center">
			<span class={`absolute z-10 w-full text-center self-center text-xs ${props.error ? 'text-red-500' : ''}`}>
				{getProgressMessage()}
			</span>
			<span class="absolute left-0 top-0 h-full bg-slate-200 " style={{ width: props.alpha * 100 + '%' }} />
		</div>
	)
}

const File = (props: { file: File }) => {
	const [progress, setProgress] = createSignal<{
		alpha: number
		loaded: number
		total: number
	}>()
	const [completed, setCompleted] = createSignal(false)
	const [error, setError] = createSignal(false)

	const upload = () => {
		setError(false)
		setCompleted(false)
		uploadFile({
			file: props.file,
			onprogress: (p) => setProgress(p),
			onerror: (error) => setError(error),
			onsuccess: (log) => {
				setCompleted(true)
			},
		})
	}
	upload()

	return (
		<div class={`p-2 flex gap-2`}>
			<Thumbnail file={props.file} />
			<span class="pl-2 flex-1 text-xs self-center">{props.file.name}</span>
			<Progress message={error()} loaded={progress()?.loaded} total={progress()?.total} />

			{error() ? (
				<button class={`self-center p-2 rounded-full ${s_button}`} onclick={upload}>
					<BsArrowRepeat size={21} />
				</button>
			) : (
				<button class={`self-center p-2 rounded-full ${completed() || error() ? s_button : s_inactiveButton}`}>
					<BsXLg size={21} />
				</button>
			)}
		</div>
	)
}

const Uploads = (props) => {
	const [previews, setPreviews] = createSignal<File[]>([])
	let input

	const processInput = (fileList: FileList) => {
		const files = Array.from(fileList)
		setPreviews(files)
		props.oninput(files.map((file) => file.name))
	}

	createEffect(() => console.log('VALUE', props.value))

	return (
		<>
			<input
				ref={input}
				type="file"
				multiple
				hidden
				oninput={(e) => {
					processInput(e.target.files)
				}}
			/>
			<button class={`${s_button} text-xl`} onclick={() => input.click()}>
				upload
			</button>
			<div class="pt-8">
				<For each={previews() || []}>{(file) => <File file={file} />}</For>
			</div>
		</>
	)
}

export default register(Uploads, 'string')
