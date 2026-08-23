import {Card, Checkbox, Input} from 'antd';

import './App.css';
import {useTodoStore} from "./model/todoStore.ts";
import {useState} from "react";


function App() {
    const {addTodo, changeIsCompleted, todos} = useTodoStore();
    const [text, setText] = useState<string>('');
    return <div className="wrapper">
        <Input
            style={{width: 300}}
            onChange={(event) => {setText(event.target.value)}}
            value={text}
            onKeyDown={(e) => {
                if (e.key == 'Enter') {
                    addTodo(text);
                    setText('');
            }}}
        />
        {todos.map((todo, index) => (
            <Card className="card">
                <Checkbox checked={todo.isCompleted} onChange={() => changeIsCompleted(index)}/>
                <span>{todo.title}</span>
            </Card>
        ))}
    </div>
}

export default App
