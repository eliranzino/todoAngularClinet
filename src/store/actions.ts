import {createAction, props} from '@ngrx/store';
import { IUser } from 'src/models/user';
import { ITodo } from 'src/app/todo';

export const loginAction = createAction('LOGIN_PENDING', props<{ user: IUser }>());  
export const loginActionSuccess = createAction('LOGIN_SUCCESS'); 
export const loginActionFail = createAction('LOGIN_FAIL'); 


export const registerAction = createAction('REGISTER_PENDING', props<{ user: IUser }>());
export const registerActionSuccess = createAction('REGISTER_SUCCESS');

export const logoutAction = createAction('LOGOUT_PENDING');  
export const logoutActionSuccess = createAction('LOGOUT_SUCCESS'); 
export const logoutActionFail = createAction('LOGOUT_FAIL'); 

export const addTodo = createAction('ADD_TODO_PENDING',props<{ todoRequest: Omit<ITodo, 'ID' | 'Complete'> }>());//i sent to the server
export const addTodoSuccess = createAction('ADD_TODO_SUCCESS', props<{ todo: ITodo }>());// the server created full todo
export const addTodoFail = createAction('ADD_TODO_FAIL');

export const getTodos = createAction('GET_TODOS_PENDING');
export const getTodosSuccess = createAction('GET_TODOS_SUCCESS', props<{ todos: ITodo[] }>());
export const getTodosFail = createAction('GET_TODOS_FAIL');

export const deleteTodo = createAction('DELETE_TODO_PENDING',props<{ todo: ITodo }>());
export const deleteTodoSuccess = createAction('DELETE_TODO_SUCCESS',props<{ id: number }>());
export const deleteTodoFail = createAction('DELETE_TODO_FAIL');


export const updateTodo = createAction('UPDATE_TODO_PENDING',props<{ todo: ITodo }>());
export const updateTodoSuccess = createAction('UPDATE_TODO_SUCCESS',props<{ id: number  }>());
export const updateTodoFail = createAction('UPDATE_TODO_FAIL',props<ITodo>());




