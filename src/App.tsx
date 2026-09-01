import './App.css';
import {Cart} from "./components/Cart.tsx";
import {SearchInput} from "./components/SearchInput.tsx";
import {CardList} from "./components/CardList.tsx";

function App() {
    // const {text, setText} = useSearchStore();
    return (
        <div className="wrapper">
            <SearchInput/>
            <CardList/>
            <Cart/>
        </div>
    );
}

export default App;
