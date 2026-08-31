import type {CoffeeType, GetCoffeeListReqParams, OrderItem} from "./coffeetypes.ts";

export type ListState = {
    coffeeList?: CoffeeType[];
    controller?: AbortController;
    params: GetCoffeeListReqParams;
};

export type ListActions = {
    getCoffeeList: (params?: GetCoffeeListReqParams) => void;
    setParams: (params?: GetCoffeeListReqParams) => void;
};

export type CartState = {
    cart?: OrderItem[];
    address?: string;
};

export type CartActions = {
    addToCart: (item: CoffeeType) => void;
    clearCart: () => void;
    orderCoffee: () => void;
    setAddress: (address: string) => void;
};