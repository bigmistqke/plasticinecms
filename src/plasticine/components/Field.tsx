import { Component, createEffect, createSignal } from 'solid-js'
import { Dynamic } from 'solid-js/web'

import { useStore } from '../store'

import { RegisteredFieldData, TabData } from './types'

const Field: Component<{ data: RegisteredFieldData; tabData?: TabData; path: (string | number)[] }> = (props) => {
	let { state, setState } = useStore(props)

	let [error, setError] = createSignal(false)

	const oninput = (value: any) => {
		if (props.data.oninput) value = props.data.oninput(value)

		setState(value)

		if (!props.data.validate) {
			setError(false)
			return
		}

		const result = props.data.validate(value)

		if ((typeof result === 'object' && result.success) || (typeof result === 'boolean' && result)) {
			setError(false)
			return
		}

		setError(result.error || true)

		return false
	}

	return (
		<Dynamic
			{...props.data}
			path={props.path}
			component={props.data.type}
			data={props.data}
			error={error()}
			value={state()}
			oninput={oninput}
		/>
	)
}

export default Field
