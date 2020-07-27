import { createReducer, on } from '@ngrx/store';
import { ITodo } from 'src/app/todo';
import { getTodos, getTodosSuccess, getTodosFail, addTodoSuccess, deleteTodoSuccess, updateTodoSuccess } from './actions';

export interface ITodosState {
    items: ITodo[];
    isLoading: boolean;
};

const initialState: ITodosState = {
    items: [],
    isLoading: false,
}

export const todosReducer = createReducer<ITodosState>(initialState,
    on(getTodos, state => ({ ...state, isLoading: true })),

    on(getTodosSuccess, (state, { todos }) => ({ ...state, isLoading: false, items: todos })),

    on(getTodosFail, (state) => ({ ...state, isLoading: false })),

    on(addTodoSuccess, (state, { todo }) => ({ ...state, items: state.items.concat(todo) })),

    on(deleteTodoSuccess, (state, { id }) => ({ ...state, items: state.items.filter(item => item.ID != id) })),
    
    on(updateTodoSuccess, (state, { id }) => {
        const { items } = state;
        const modifiedTodos = items.slice();
        console.log('modifiedTodos', modifiedTodos, 'id-', +id)
        const cellIndexUpdate = modifiedTodos.findIndex(task => task.ID === +id);
        console.log({ cellIndexUpdate })
        const todo = modifiedTodos[cellIndexUpdate];
        modifiedTodos[cellIndexUpdate] = {...todo, Complete: !todo.Complete};
        console.log({modifiedTodos})
        return {
            ...state,
            items: modifiedTodos,
        }
    })
);





//   const { todos } = state;
//   const { result } = action.payload;
//   console.log('this is the result', result)
//   const idAsNumber = Number(result.id);
//   console.log({idAsNumber})
//   const modifiedTodos = todos.slice();
//   const cellIndexUpdate = modifiedTodos.findIndex(task => task.ID === idAsNumber);
//   const completedTask = modifiedTodos.find(task=> task.ID === idAsNumber);
//   console.log({cellIndexUpdate})
//   console.log({completedTask})
//   //@ts-ignore
//   modifiedTodos[cellIndexUpdate] = completedTask

