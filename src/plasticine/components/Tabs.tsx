import { Component, createEffect, For } from "solid-js"
import { createStore } from "solid-js/store"
import { buttonStyle } from "./styles"
import { tabState } from "./types"

const Tabs: Component<{ onselect, onadd, amount, selected }> = (props) => {
    createEffect(() => {
        if (props.amount - 1 < props.selected) {
            props.onselect(props.amount - 1)
        }
    })
    return <div class="flex flex-1 w-96">
        <div class="flex-1 flex gap-1 flex-wrap">
            <For each={Array(props.amount).fill(0)}>{(el, index) =>
                <button
                    class={`${buttonStyle} ${props.selected === index() ? "bg-slate-700 text-slate-50" : " text-slate-600"}`}
                    onclick={() => props.onselect(index())}
                >{index}</button>
            }</For>
        </div>
        <button class={`${buttonStyle} text-slate-600`} onclick={() => props.onadd(props.amount)}>add</button>
    </div >
}

export default Tabs