import './App.css';
import {Button, Card, Rate, Tag} from "antd";
import {ShoppingCartOutlined} from '@ant-design/icons';
import {useCoffeeStore} from "./model/coffeeStore.ts";
import {useEffect} from "react";

function App() {
    const {getCoffeeList, coffeeList} = useCoffeeStore();

    useEffect(() => {
        getCoffeeList()
    }, [getCoffeeList]);

    return (
        <div className="wrapper">
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
            </div>
        </div>
    );
}

export default App;
