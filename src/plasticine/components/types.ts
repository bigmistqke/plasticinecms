import { JSX } from "solid-js/jsx-runtime"

export interface inputProps {
    label,
    type?,
    placeholder?,
    onfocus?,
    onload?,
    onchange?,
    oninput?,
    value?,
    error?
}


export interface tabState {
    amount: number,
    selectedIndex: number
}

export interface fieldData {
    type: Function,
    label: string,
    oninput?: Function,
    validate?: Function,
    children?: fieldData[],
    defaultValue: any
}

export interface field {
    data: fieldData,
    path: (string | number)[],
}
export interface fieldComponent extends field {
    tabState?: tabState,
}