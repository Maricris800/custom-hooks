import { todoReducer } from "../08- useReducer/todoReducer";
import { useReducer, useEffect } from "react";

export const useTodos = () => {

    const initialState = [
        // {
        //     id: new Date().getTime(),
        //     description: "Recolectar la piedra del Alma",
        //     done: false,
        // },   
    ];

    const init = () => {
        return JSON.parse(localStorage.getItem("todos")) || [];
    }

    const [todos, dispatch] = useReducer(todoReducer, initialState, init);

    useEffect(() => {
      
        localStorage.setItem("todos", JSON.stringify(todos));    
      
    }, [todos])
    

    const handleNewTodo = ( todo ) => {
        
        const action = {

            type: "[TODO] Add Todo",
            payload: todo,

        } 

        dispatch(action);
    }

    const handleDeleteTodo = (id) => {
        dispatch({
            type: "[TODO] Remove Todo",
            payload: id,
        })
    }

    const handleToggleTodo = (id) => {
        dispatch({
            type: "[TODO] Toggle Todo",
            payload: id,
        })
    }

    const todosCount = todos.length;

    const pendingTodosCount = todos.filter(todo => !todo.done).length;

    return {
        todos,
        handleDeleteTodo,
        handleNewTodo,
        handleToggleTodo,
        todosCount,
        pendingTodosCount,
    }
}