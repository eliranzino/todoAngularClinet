import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError, exhaustMap } from 'rxjs/operators';
import { TodoSeviseService } from '../app/todo-sevise.service';
import { getTodos, getTodosSuccess, getTodosFail, addTodo, addTodoSuccess, addTodoFail, loginAction, loginActionSuccess, registerActionSuccess, registerAction, deleteTodo, deleteTodoSuccess, updateTodo, updateTodoSuccess, loginActionFail, logoutAction } from './actions';
import { of } from 'rxjs';
import { saveToken } from 'src/token';
import { Router } from '@angular/router'


@Injectable()
export class TodoEffects {

    getTodos$ = createEffect(() => this.actions$.pipe(
        ofType(getTodos),
        mergeMap(() => this.TodoSeviseService.getTodos().pipe(
            map(todos => {
                console.log(' in effect get todos, the todos are-', todos)
                return getTodosSuccess({ todos });
            },
                catchError(() => of(getTodosFail())
                ))
        ))
    ));

    addTodo$ = createEffect(() => this.actions$.pipe(
        ofType(addTodo),
        // exhaustMap only accepts one action at a time and ignores any subsequent actions
        // until the effect is complete
        exhaustMap(action => this.TodoSeviseService.addTodo(action.todoRequest).pipe(
            map(todo => addTodoSuccess({ todo })),
            catchError(() => of(addTodoFail()))
        ))
    ))

    login$ = createEffect(() => this.actions$.pipe(
        ofType(loginAction),
        exhaustMap((action) => this.TodoSeviseService.login(action.user)
            .pipe(
                map(Response => {
                    console.log('the token is', Response.token)

                    saveToken(Response.token);
                    console.log('in login effect and the action.user is:', action.user)
                    this.router.navigate(['/todoList']);
                    return loginActionSuccess();
                },
                    catchError(() => of(loginActionFail()))
                )))
    ));

    register$ = createEffect(() => this.actions$.pipe(
        ofType(registerAction),
        exhaustMap((action) => this.TodoSeviseService.register(action.user)
            .pipe(
                map(Response => {
                    console.log('the token is', Response.token)

                    saveToken(Response.token);
                    console.log('in register effect and the action.user is:', action.user)
                    this.router.navigate(['/todoList']);
                    return registerActionSuccess();
                },
                    catchError(() => EMPTY)
                )))
    ));


    delete$ = createEffect(() => this.actions$.pipe(
        ofType(deleteTodo),
        exhaustMap((action) => this.TodoSeviseService.deleteTodo(action.todo)
            .pipe(
                map(id => {
                    console.log('in delete effect and the response is ', id)
   
                    console.log('the id: ', id)
                    //@ts-ignore
                    return deleteTodoSuccess({id});
                },
                    catchError(() => EMPTY)
                )))
    ));

    update$ = createEffect(() => this.actions$.pipe(
        ofType(updateTodo),
        exhaustMap((action) => this.TodoSeviseService.updateTodo(action.todo)
            .pipe(
                map(id => {
                    console.log('in update effect and the id is ', id)
                    //@ts-ignore
                    return updateTodoSuccess({id});
                },
                    catchError(() => EMPTY)
                )))
    ));

    constructor(
        private actions$: Actions,
        private TodoSeviseService: TodoSeviseService,
        private router: Router
    ) { }
}