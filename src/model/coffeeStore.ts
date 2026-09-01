import {create} from "zustand";
import {devtools, persist} from "zustand/middleware";
import type {CoffeeType, GetCoffeeListReqParams} from "../types/coffeetypes.ts";
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
export const setParams = (params: GetCoffeeListReqParams) => useCoffeeStore.getState().setParams(params);
export const setAddress = (address: string) => useCoffeeStore.getState().setAddress(address);
export const orderCoffee = () => useCoffeeStore.getState().orderCoffee();
export const clearCart = () => useCoffeeStore.getState().clearCart();
export const addToCart = (item: CoffeeType) => useCoffeeStore.getState().addToCart(item);