import { Component, createEffect, For } from 'solid-js'
import { s_button } from './styles'

const Tabs: Component<{
	onselect: (index: number) => void
	onadd: (amount: number) => void
	amount: number
	selected: number
}> = (props) => {
	createEffect(() => {
		//  at the moment we keep the tab at the same index even when a parenting tab changes
		//  this fx prevents the selected index to exceed the amount of tabs
		if (props.amount - 1 < props.selected) {
			props.onselect(props.amount - 1)
		}
	})
	return (
		<div class="flex flex-1 w-96">
			<div class="flex-1 flex gap-1 flex-wrap">
				<For each={Array(props.amount).fill(0)}>
					{(el, index) => (
						<button
							class={`${s_button} ${
								props.selected === index() ? 'bg-slate-700 text-slate-50' : ' text-slate-600'
							}`}
							onclick={() => props.onselect(index())}
						>
							{index}
						</button>
					)}
				</For>
			</div>
			<button class={`${s_button} text-slate-600`} onclick={() => props.onadd(props.amount)}>
				add
			</button>
		</div>
	)
}

export default Tabs
