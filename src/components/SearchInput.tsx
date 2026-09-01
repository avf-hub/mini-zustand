import {Input} from "antd";
import {getCoffeeList, setParams, useCoffeeStore} from "../model/coffeeStore.ts";
import {useShallow} from "zustand/react/shallow";
import {useEffect} from "react";
import {useUrlStorage} from "../helpers/useUrlStorage.ts";

export const SearchInput = () => {
    const [params] = useCoffeeStore(useShallow(state => [state.params]));
    useUrlStorage(params, setParams);

    useEffect(() => {
        getCoffeeList(params);
    }, [params]);

    return (<Input
        placeholder="поиск"
        onChange={(event) => setParams({text: event.target.value})}
        value={params.text}/>);
};