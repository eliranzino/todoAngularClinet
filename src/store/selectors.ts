import { createSelector } from '@ngrx/store';
import { IState } from '../app/app.module';
import { IUserState } from './userReducer';

export const selectAllTodos = createSelector(
    // we provide createSelector a number of (state) => any functions
    // the last function will have as parameters the values of all previous functions
    (state: IState) => state.todos,
    // todos is the result of the function above
    todos => todos.items
);

export const selectMessages = createSelector(
    (state:IUserState) => state.message,
    message => message
);

export const selectCompleteTodos = createSelector(
    selectAllTodos,
    items => items.filter(item => item.Complete),
);

export const selectIncompleteTodos = createSelector(
    selectAllTodos,
    items => items.filter(item => !item.Complete)
);
