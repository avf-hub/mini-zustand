import {Button, Input} from "antd";
import {useCoffeeStore} from "../model/coffeeStore.ts";

export const Cart = () => {
    const {cart, address, setAddress, orderCoffee, clearCart} = useCoffeeStore();

    return (
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
    );
};