import { createStore } from "solid-js/store"

export default (fields) => {
    const [store, setStore] = createStore();



    return [store, setStore];
}