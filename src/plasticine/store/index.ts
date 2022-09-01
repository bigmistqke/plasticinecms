import { createEffect, createMemo } from "solid-js";
import { createStore } from "solid-js/store"
import { field, fieldData } from "../components/types";
import fals from "fals"

const [store, setStore] = createStore<any>({});
const [types, setTypes] = createStore({});

export const useStore: any = (props = { path: [] }) => {
    return {
        state: createMemo(() => getStateFromPath(props.path)),
        setState: (...args: any[]) => {
            console.log(...(props.path as []), ...args)
            setStore(...(props.path as []), ...args)
        }
    }
}
export const getStateFromPath = (_path: (string | number)[]) => {
    if (!_path) return;

    const path = [..._path];
    let state = store;
    let walkedPath: (string | number | undefined)[] = []

    while (path.length > 0) {
        let dir = path.shift();
        let temp;

        walkedPath.push(dir);
        temp = state[dir];

        if (fals(temp)) {
            return undefined
        } else {
            state = temp;
        }
    }
    return state
}

export const initStateSubCollection = (fields, path, index) => {

    const walk = (fields: fieldData[], path: (string | number)[]) => {
        fields.forEach((field) => {
            let new_path = [...path, field.label];

            // TODO: find something less hacky to deep-clone
            const value = JSON.parse(JSON.stringify(field.defaultValue));

            setStore(...(new_path as []), value);
            if (field.children) {
                walk(field.children, [...new_path, 0])
            }
        })
    }

    setStore(...(path as []), index, {});
    walk(fields, [...path, index])
}

export const initStateCollection = ({ name, collection }: { name: string, collection: Function }) => {
    const { fields } = collection();
    setStore(name, [{}])
    initStateSubCollection(fields, [name], 0)
}   