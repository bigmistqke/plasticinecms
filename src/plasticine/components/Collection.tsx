import { Component, createEffect, createMemo, createSignal, For, onMount, Show } from 'solid-js'
import { createStore } from 'solid-js/store'
import { initStateSubCollection, useStore } from '../store'
import Field from './Field'
import { s_activeButton, s_button, s_header, s_inactiveButton, s_panel, s_title } from './styles'
import { RegisteredFieldData } from '../types'

const Collection: Component<{
	path: string[]
	name: string
	fields: { data: RegisteredFieldData; path: string[] }[]
	useAsTitle?: string
	children?: any[]
}> = (props) => {
	const { state, setState } = useStore(props)

	const [listOpened, setListOpened] = createSignal(false)

	const [selected, setSelected] = createSignal(0)

	const title = createMemo(() => {
		if (!props.useAsTitle) return props.name
		if (!state()) return ''
		if (!state()[selected()]) return ''
		if (state()[selected()][props.useAsTitle] === '') return '...'
		return state()[selected()][props.useAsTitle]
	})

	const add = () => {
		console.log(props.fields)
		const amount = state()?.length || 1
		initStateSubCollection([...props.fields], [props.name], amount)
		setSelected(amount)
		setListOpened(false)
	}

	createEffect(() => console.log('SELECTED', selected()))

	const hasPrevious = () => selected() !== 0
	const hasNext = () => state() && selected() !== state()?.length - 1
	return (
		<>
			<header class={s_header}>
				<div class="flex-1">
					{props.name}
					<button
						class={`${!listOpened() ? 'bg-slate-700 text-slate-200' : ''} ${s_button} ml-4`}
						onclick={() => setListOpened(false)}
					>
						edit
					</button>
					<button
						class={`${listOpened() ? 'bg-slate-700 text-slate-200' : ''} ${s_button} ml-4`}
						onclick={() => setListOpened(true)}
					>
						list
					</button>
				</div>
				<div>
					({selected() + 1} / {state()?.length || 1})
					<button
						class={`${hasPrevious() ? s_button : s_inactiveButton} ml-4`}
						onclick={() => (hasPrevious() ? setSelected(selected() - 1) : '')}
					>
						← prev
					</button>
					<button
						class={`${hasNext() ? s_button : s_inactiveButton}  ml-4`}
						onclick={() => (hasNext() ? setSelected(selected() + 1) : '')}
					>
						next →
					</button>
					<button class={`${s_button} ml-4`} onclick={add}>
						add{' '}
					</button>
				</div>
			</header>

			<div class={listOpened() ? '' : 'hidden'}>
				<ul class={s_panel}>
					<For each={state()}>
						{(entry: any, i) => (
							<li class="flex  pb-2 mb-2 text-xl pl-2 flex-1">
								<button
									class="flex-1 flex cursor-pointer "
									onclick={() => {
										setListOpened(false)
										setSelected(i())
									}}
								>
									<span class={selected() === i() ? s_activeButton : s_button}>{i() + 1}</span>
									<span class={`hover:font-bold pl-4 text-2xl`}>
										{props.useAsTitle ? entry[props.useAsTitle] : ''}{' '}
									</span>
								</button>
								<button class={s_button}>delete</button>
							</li>
						)}
					</For>
				</ul>
			</div>
			<div class={listOpened() ? 'hidden' : ' overflow-auto'}>
				<div class={s_panel}>
					<div class="flex pb-4">
						<h1 class={s_title}>{title()}</h1>
						{/* <Tabs
                        onselect={(index) => setSelected(index)}
                        onadd={add}
                        amount={state()?.length || 1}
                        selected={selected()}
                    /> */}
					</div>

					<div class="flex flex-col gap-2 ">
						<For each={props.fields || []}>
							{(data: RegisteredFieldData) => (
								<div class="pl-2">
									<Field data={data} path={[props.name, selected(), data.label]} />
								</div>
							)}
						</For>
					</div>
				</div>
			</div>
		</>
	)
}

export default Collection
