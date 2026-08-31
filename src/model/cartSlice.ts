import type {StateCreator} from "zustand";
import type {CartActions, CartState, ListActions, ListState} from "../types/storetypes.ts";
import axios from "axios";
import type {OrderCoffeeRes, OrderItem} from "../types/coffeetypes.ts";
import {ORDER_URL} from "../api/CoreApi.ts";

export const cartSlice: StateCreator<
    CartState & CartActions & ListState & ListActions,
    [['zustand/devtools', never], ["zustand/persist", unknown]],
    [['zustand/devtools', never], ["zustand/persist", unknown]],
    CartState & CartActions
> = (setState, getState) => ({
    cart: undefined,
    address: undefined,
    addToCart: (item) => {
        const {cart} = getState();
        const {id, name, subTitle} = item;
        const preparedItem: OrderItem = {
            id,
            name: `${name} ${subTitle}`,
            size: "L",
            quantity: 1
        };
        setState({cart: cart ? [...cart, preparedItem] : [preparedItem]});
    },
    clearCart: () => {
        setState({cart: undefined});
    },
    orderCoffee: async () => {
        const {cart, address, clearCart} = getState();
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
        setState({address});
    }
});