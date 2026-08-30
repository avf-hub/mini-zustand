import {create, type StateCreator} from "zustand";
import {devtools, persist} from "zustand/middleware";
import axios from 'axios';
import type {CoffeeType, GetCoffeeListReqParams, OrderCoffeeRes, OrderItem} from "../types/coffeetypes.ts";

const BASE_URL = 'https://purpleschool.ru/coffee-api';
const ORDER_URL = BASE_URL + "/order";

type CoffeeState = {
    coffeeList?: CoffeeType[];
    controller?: AbortController;
    cart?: OrderItem[];
    address?: string;
    params: GetCoffeeListReqParams;
};

type CoffeeActions = {
    getCoffeeList: (params?: GetCoffeeListReqParams) => void;
    addToCart: (item: CoffeeType) => void;
    clearCart: () => void;
    orderCoffee: () => void;
    setAddress: (address: string) => void;
    setParams: (params?: GetCoffeeListReqParams) => void;
};

const coffeeSlice: StateCreator<CoffeeState & CoffeeActions, [['zustand/devtools', never], ["zustand/persist", unknown]]> = (set, get) => ({
    coffeeList: undefined,
    controller: undefined,
    cart: undefined,
    address: undefined,
    params: {
        text: undefined
    },
    setParams: (newParams) => {
        const {getCoffeeList, params} = get();
        set({params: {...params, ...newParams}}, false, "setParams");
        getCoffeeList(params);
    },
    addToCart: (item) => {
        const {cart} = get();
        const {id, name, subTitle} = item;
        const preparedItem: OrderItem = {
            id,
            name: `${name} ${subTitle}`,
            size: "L",
            quantity: 1
        };
        set({cart: cart ? [...cart, preparedItem] : [preparedItem]});
    },
    clearCart: () => {
        set({cart: undefined});
    },
    orderCoffee: async () => {
        const {cart, address, clearCart} = get();
        try {
            const {data} = await axios.post<OrderCoffeeRes>(ORDER_URL, {
                address,
                orderItems: cart
            });
            if (data.success) {
                alert(data.message);
                clearCart();
            }
        } catch (error) {
            console.log(error);
        }
    },
    setAddress: (address) => {
        set({address});
    },
    getCoffeeList: async (params) => {
        const {controller} = get();
        if (controller) {
            controller.abort();
        }

        const newController = new AbortController();
        set({controller: newController});
        const {signal} = newController;

        try {
            const {data} = await axios.get<CoffeeType[]>(BASE_URL, {params, signal});
            set({coffeeList: data});
        } catch (error) {
            if (axios.isCancel(error)) {
                return;
            }
            console.log(error);
        }
    }
});

export const useCoffeeStore = create<CoffeeState & CoffeeActions>()(
    devtools(persist(coffeeSlice, {
        name: "coffeeStore",
        partialize: (state) => ({cart: state.cart, address: state.address})
    }), {name: "coffeeStore"})
);

export const getCoffeeList = (params: GetCoffeeListReqParams) => useCoffeeStore.getState().getCoffeeList(params);