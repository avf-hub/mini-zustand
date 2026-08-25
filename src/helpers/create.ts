import type {StateCreator} from "zustand";
import {create as _create} from "zustand";

const resetStoreFnSet = new Set<() => void>;

export const resetAllStore = () => {
    resetStoreFnSet.forEach((fn) => {
        fn();
    });
};

export const create = (<T>() => {
    return (stateCreator: StateCreator<T>) => {
        const store = _create(stateCreator);
        const initialStore = store.getInitialState();
        const resetStore = () => {
            store.setState(initialStore);
        };
        resetStoreFnSet.add(resetStore);
        return store;
    };
}) as typeof _create;