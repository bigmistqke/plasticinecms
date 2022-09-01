import { Component, createMemo, createSignal, For, onMount } from "solid-js";
import { initStateCollection, useStore } from "../store";
import Collection from "./Collection";
import Collections from "./Collections";
import { buttonStyle, headerStyle } from "./styles";

const CMS: Component<{ collections: any }> = (props) => {
    const { state, setState } = useStore();
    const [selectedCollectionIndex, setSelectedCollectionIndex] = createSignal(0);

    console.log(props.collections);

    const panelStyle = "pl-8 p-2 flex-1 flex flex-col"

    const selectedCollectionName = createMemo(() => Object.keys(props.collections)[selectedCollectionIndex()])
    const selectedCollection = createMemo(() => props.collections[selectedCollectionName()]())


    Object.entries(props.collections).forEach(([name, collection]) =>
        initStateCollection({ name, collection: collection as Function })
    )
    console.log("THIS HERE")



    return <div class=" w-full h-full text-slate-500 flex">
        <div class="w-64 flex-col flex bg-slate-200 overflow-auto">
            <header class={headerStyle}>Collections</header>
            <div class={panelStyle}>
                <ul>
                    <For each={Object.keys(props.collections)}>{
                        (collection_name, index) =>
                            <li
                                class={`select-none cursor-pointer hover:font-bold text-2xl ${selectedCollectionIndex() === index() ? "font-bold" : ""}`}
                                onclick={() => setSelectedCollectionIndex(index())}>
                                {collection_name}
                            </li>
                    }</For>
                </ul>

            </div>

        </div>
        <div class="flex-1 flex flex-col bg-slate-100">
            <Collection
                name={selectedCollectionName()}
                fields={selectedCollection().fields}
                useAsTitle={selectedCollection().useAsTitle}
                path={[selectedCollectionName()]}
            />
        </div>
        <div class="w-96 pre-wrap flex  flex-col text-xs overflow-auto bg-slate-50 ">
            <header class={headerStyle}>Data</header>
            <pre class={panelStyle}>
                {
                    JSON.stringify(state(), null, 2)
                }
            </pre>

        </div>

    </div >
}



export default CMS;