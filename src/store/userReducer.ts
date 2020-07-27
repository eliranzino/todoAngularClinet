import { createReducer, on } from '@ngrx/store';
import { IUser } from 'src/models/user';
import { loginActionSuccess, loginActionFail } from './actions';


export interface IUserState {
    isLoggedIn: boolean;
    message: string;
};

export const initialState: IUserState = {
    isLoggedIn: false,
    message: '',
}

export const userReducer = createReducer<IUserState>(initialState,
    on(loginActionSuccess, state => ({ ...state, isLoggedIn: true })),
    on(loginActionFail, state => ({ ...state, message: "Login fail.", isLoggedIn: false }))
);