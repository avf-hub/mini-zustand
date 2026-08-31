import {create} from "zustand";
import {devtools, persist} from "zustand/middleware";
import type {GetCoffeeListReqParams} from "../types/coffeetypes.ts";
import type {CartActions, CartState, ListActions, ListState} from "../types/storetypes.ts";
import {listSlice} from "./listSlice.ts";
import {cartSlice} from "./cartSlice.ts";

export const useCoffeeStore = create<ListState & ListActions & CartState & CartActions>()(
    devtools(persist((...arg) => ({...listSlice(...arg), ...cartSlice(...arg)}), {
        name: "coffeeStore",
        partialize: (state) => ({cart: state.cart, address: state.address})
    }), {name: "coffeeStore"})
);

export const getCoffeeList = (params: GetCoffeeListReqParams) => useCoffeeStore.getState().getCoffeeList(params);