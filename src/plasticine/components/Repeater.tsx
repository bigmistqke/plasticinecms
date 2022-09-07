import { Component, createEffect, createSignal, For, JSXElement } from 'solid-js'
import { createStore } from 'solid-js/store'
import { register } from '../helpers/register'
import { initStateSubCollection, useStore } from '../store'
import Field from './Field'
import { s_smallTitle } from './styles'
import Tabs from './Tabs'
import { RegisteredFieldData, TabData } from '../types'

const Repeater: Component<{
	data: RegisteredFieldData
	tabData?: TabData
	path: (string | number)[]
	children: RegisteredFieldData[]
}> = (props) => {
	if (!props.path) return

	const { state, setState } = useStore(props)

	const [selected, setSelected] = createSignal(0)

	const add = (amount) => {
		initStateSubCollection(props.children, props.path, amount)
		setSelected(state()?.length - 1 || 1)
	}

	const fields = props.data.children
		? Array.isArray(props.data.children)
			? props.data.children
			: [props.data.children]
		: []

	return (
		<div>
			<div class="flex pt-4">
				<h2 class={s_smallTitle}>{props.data.label}</h2>
				<Tabs
					onselect={(index) => setSelected(index)}
					onadd={add}
					amount={state()?.length || 1}
					selected={selected()}
				/>
			</div>

			<div class="flex flex-col gap-2 pl-3 pt-3 pb-3">
				<For each={fields}>
					{(data: RegisteredFieldData) => (
						<Field
							data={data}
							path={[...props.path, Math.min(state()?.length || 1, selected()), data.label]}
						/>
					)}
				</For>
			</div>
		</div>
	)
}
export default register(Repeater, 'repeater')
