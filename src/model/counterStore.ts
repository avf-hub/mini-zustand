import {create, type StateCreator} from "zustand";

type CounterState = { counter: number };
type CounterActions = {
    increment: () => void;
    decrement: () => void;
    changeByAmound: (value: number) => void;
};

const counterSlice: StateCreator<CounterState & CounterActions> = (set, get) => ({
    counter: 0,
    increment: () => {
        const {counter} = get();
        set({counter: counter + 1});
    },
    decrement: () => {
        const {counter} = get();
        set({counter: counter - 1});
    },
    changeByAmound: (value: number) => {
        const {counter} = get();
        set({counter: counter + value});
    }
});

export const useCounterStore = create<CounterState & CounterActions>(counterSlice);

export const changeByAmound = (value: number) => useCounterStore.getState().changeByAmound(value);
export const getCounter = () => useCounterStore.getState().counter;