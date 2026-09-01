import {CoffeeCategoryEnum} from "../types/coffeetypes.ts";
import {Button} from "antd";
import {setParams, useCoffeeStore} from "../model/coffeeStore.ts";
import {useShallow} from "zustand/react/shallow";

export const CategoryPicker = () => {
    const [params] = useCoffeeStore(useShallow((state) => [state.params]));
    return <div>
        {Object.keys(CoffeeCategoryEnum).map((key) => (
            <Button
                key={key}
                danger={params.type === key}
                onClick={
                    () => setParams({type: CoffeeCategoryEnum[key as keyof typeof CoffeeCategoryEnum]})
                }>
                {key}
            </Button>
        ))}
    </div>;
};