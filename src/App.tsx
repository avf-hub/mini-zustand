import './App.css';
import {Input} from "antd";
import {useCoffeeStore} from "./model/coffeeStore.ts";
import {useEffect} from "react";
import {useUrlStorage} from "./helpers/useUrlStorage.ts";
import {CoffeeCard} from "./components/CoffeeCard.tsx";
import {Cart} from "./components/Cart.tsx";

function App() {
    const {
        getCoffeeList,
        coffeeList,
        params,
        setParams
    } = useCoffeeStore();
    // const {text, setText} = useSearchStore();

    useEffect(() => {
        getCoffeeList(params);
    }, []);

    useUrlStorage(params, setParams);

    return (
        <div className="wrapper">
            <Input
                placeholder="поиск"
                onChange={(event) => setParams({text: event.target.value})}
                value={params.text}/>
            <div style={{display: "flex"}}>
                <div className="cardsContainer">
                    {coffeeList && coffeeList.map((coffee) => <CoffeeCard coffee={coffee}/>)}
                </div>
            </div>
            <Cart/>
        </div>
    );
}

export default App;
