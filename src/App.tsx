import './App.css';
import {Button, Card, Input, Rate, Tag} from "antd";
import {ShoppingCartOutlined} from '@ant-design/icons';
import {useCoffeeStore} from "./model/coffeeStore.ts";
import {useEffect, useState} from "react";
import {useCounterStore} from "./model/counterStore.ts";

function App() {
    // const {getCoffeeList, coffeeList} = useCoffeeStore();
    // const [text, setText] = useState<string | undefined>();
    //
    // const handleSearch = (text: string) => {
    //     getCoffeeList({text});
    //     setText(text);
    // }
    //
    // useEffect(() => {
    //     getCoffeeList();
    // }, [getCoffeeList]);

    const {counter, persistedCounter, increment, decrement} = useCounterStore();

    return (
        <div className="wrapper">
            <button onClick={decrement}>-</button>
            <span>{counter}</span>
            <span>{persistedCounter}</span>
            <button onClick={increment}>+</button>

            {/*<Input
                placeholder="поиск"
                onChange={(event) => handleSearch(event.target.value)}
                value={text}/>
            <div className="cardsContainer">
                {coffeeList && coffeeList.map((coffee) =>
                    <Card
                        key={coffee.id}
                        cover={<img src={coffee.image} alt={coffee.name}/>}
                        actions={[<Button icon={<ShoppingCartOutlined/>}>{coffee.price}</Button>]}>
                        <Card.Meta title={coffee.name} description={coffee.subTitle}/>
                        <Tag color="purple" style={{marginTop: 12}}>{coffee.type}</Tag>
                        <Rate defaultValue={coffee.rating} disabled allowHalf/>
                    </Card>)}
            </div>*/}
        </div>
    );
}

export default App;
