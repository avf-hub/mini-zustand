import {CoffeeCard} from "./CoffeeCard.tsx";
import {useCoffeeStore} from "../model/coffeeStore.ts";
import {useShallow} from "zustand/react/shallow";

export const CardList = () => {
    const [coffeeList] = useCoffeeStore(useShallow(state => [state.coffeeList]));

    return (
        <div style={{display: "flex"}}>
            <div className="cardsContainer">
                {coffeeList && coffeeList.map((coffee) => <CoffeeCard key= {coffee.id} coffee={coffee}/>)}
            </div>
        </div>
    );
}