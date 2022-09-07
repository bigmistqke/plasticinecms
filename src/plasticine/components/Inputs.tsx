import { Component, createUniqueId, JSX, JSXElement, Show } from 'solid-js'
import { register } from '../helpers/register'
import ContainerWithLabel from './ContainerWithLabel'

export interface InputProps {
	type: string
	placeholder?: string
	onfocus?: () => void
	onload?: () => void
	onchange?: (value: any) => void
	oninput?: (value: any) => void
	value?: any
	error?: string
}

export interface LabeledInputProps extends InputProps {
	label: string
}

interface ElementProps extends InputProps {
	class: string
	id: string
	title: string
}

const InputOrTextarea = (props: ElementProps) =>
	props.type === 'textarea' ? <textarea {...props} /> : <input {...props} />
const ErrorMessage: Component<{ error: string | undefined }> = (props) => (
	<Show when={props.error}>
		<span class="ml-2 text-sm text-red-500">{props.error}</span>
	</Show>
)
const Input: Component<LabeledInputProps> = (props) => {
	const inputStyle = 'rounded-lg border-2 p-1 pl-3 w-full outline-none text-slate-700'
	const id = createUniqueId()

	return (
		<ContainerWithLabel label={props.label} id={id}>
			<InputOrTextarea
				id={id}
				class={`${props.error ? 'border-red-500' : 'border-white'} ${inputStyle} `}
				type={props.type}
				title={props.error || ''}
				value={props.value || null}
				placeholder={props.placeholder}
				onfocus={props.onfocus}
				onchange={props.onchange}
				oninput={(e: { target: { value: any } }) => (props.oninput ? props.oninput(e.target.value) : null)}
			/>
			<ErrorMessage error={props.error} />
		</ContainerWithLabel>
	)
}

export const Number = register((props: LabeledInputProps) => <Input {...props} type="text" />, 'number', 0)
export const Text = register((props: any) => <Input {...props} type="text" />, 'string')
export const Textarea = register((props: any) => <Input {...props} type="textarea" />, 'string')
