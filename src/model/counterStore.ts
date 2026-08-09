import { create, type StateCreator } from "zustand";

type CounterState = { counter: number };
type CounterActions = {
    increment: () => void;
    decrement: () => void;
};

const counterSlice: StateCreator<CounterState & CounterActions> = (set, get) => ({
    counter: 0,
    increment: () => {
        const { counter } = get();
        set({ counter: counter + 1 });
    },
    decrement: () => {
        const { counter } = get();
        set({ counter: counter - 1 });
    }
});

export const useCounterStore = create<CounterState & CounterActions>(counterSlice);