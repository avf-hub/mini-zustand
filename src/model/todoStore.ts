import {create, type StateCreator} from "zustand";

export type TodoType = {
    title: string;
    isCompleted: boolean;
};

type TodoState = {
    todos: TodoType[]
};

type TodoActions = {
    addTodo: (value: string) => void;
    changeIsCompleted: (index: number) => void;
};

const todoSlice: StateCreator<TodoState & TodoActions> = (set, get) => ({
    todos: [],
    addTodo: (value: string) => {
        const {todos} = get();
        set({todos: [...todos, {title: value, isCompleted: false}]});
    },
    changeIsCompleted: (index: number) => {
        const {todos} = get();
        const newTodos: TodoType[] = [
            ...todos.slice(0, index),
            {...todos[index], isCompleted: !todos[index].isCompleted},
            ...todos.slice(index + 1)
        ];
        set({todos: newTodos});
    }
});

export const useTodoStore = create<TodoState & TodoActions>(todoSlice);