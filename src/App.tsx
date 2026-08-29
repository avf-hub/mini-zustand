import './App.css';
import {Button, Card, Input, Rate, Tag} from "antd";
import {ShoppingCartOutlined} from '@ant-design/icons';
import {useCoffeeStore} from "./model/coffeeStore.ts";
import {useEffect} from "react";
import {useSearchStore} from "./model/SearchStore.ts";

function App() {
    const {getCoffeeList, coffeeList, addToCart, cart, clearCart, orderCoffee, address, setAddress} = useCoffeeStore();
    const {text, setText} = useSearchStore();

    useEffect(() => {
        getCoffeeList();
    }, [getCoffeeList]);

    return (
        <div className="wrapper">
            <Input
                placeholder="поиск"
                onChange={(event) => setText(event.target.value)}
                value={text}/>
            <div style={{display: "flex"}}>
                <div className="cardsContainer">
                    {coffeeList && coffeeList.map((coffee) =>
                        <Card
                            key={coffee.id}
                            cover={<img src={coffee.image} alt={coffee.name}/>}
                            actions={[<Button
                                icon={<ShoppingCartOutlined onClick={() => addToCart(coffee)}/>}>{coffee.price}
                            </Button>]}>
                            <Card.Meta title={coffee.name} description={coffee.subTitle}/>
                            <Tag color="purple" style={{marginTop: 12}}>{coffee.type}</Tag>
                            <Rate defaultValue={coffee.rating} disabled allowHalf/>
                        </Card>)}
                </div>
            </div>
            <aside className="sider">
                <h1>Заказ</h1>
                {cart && cart.length > 0 ? <>
                    {cart.map((item, index) =>
                        <span key={index}>{item.name}</span>)
                    }
                </> : <span>Добавьте напитки</span>}
                <Input placeholder="адрес" value={address} onChange={(event) => setAddress(event.target.value)}/>
                <Button type="primary" onClick={orderCoffee} disabled={!address}>Сделать заказ</Button>
                <Button onClick={clearCart}>Очистить корзину</Button>
            </aside>
        </div>
    );
}

export default App;
