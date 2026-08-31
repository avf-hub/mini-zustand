import type {StateCreator} from "zustand";
import type {CartActions, CartState, ListActions, ListState} from "../types/storetypes.ts";
import type {CoffeeType} from "../types/coffeetypes.ts";
import {BASE_URL} from "../api/CoreApi.ts";
import axios from "axios";

export const listSlice: StateCreator<
    ListState & ListActions & CartState & CartActions,
    [['zustand/devtools', never], ["zustand/persist", unknown]],
    [['zustand/devtools', never], ["zustand/persist", unknown]],
    ListState & ListActions
> = (setState, getState) => ({
    coffeeList: undefined,
    controller: undefined,
    params: {
        text: undefined
    },
    setParams: (newParams) => {
        const {getCoffeeList, params} = getState();
        setState({params: {...params, ...newParams}}, false, "setParams");
        getCoffeeList(params);
    },
    getCoffeeList: async (params) => {
        const {controller} = getState();
        if (controller) {
            controller.abort();
        }

        const newController = new AbortController();
        setState({controller: newController});
        const {signal} = newController;

        try {
            const {data} = await axios.get<CoffeeType[]>(BASE_URL, {params, signal});
            setState({coffeeList: data});
        } catch (error) {
            if (axios.isCancel(error)) {
                return;
            }
            console.log(error);
        }
    }
});