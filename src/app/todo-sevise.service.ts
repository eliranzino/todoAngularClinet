import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ITodo } from './todo'
import { catchError, map, tap } from 'rxjs/operators';
import { getToken, saveToken } from "../token";
import { IUser } from 'src/models/user';
//import {delay} from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class TodoSeviseService {



  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  private URL = 'http://localhost:4000';
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
    
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);   //return observabl (by of) 
    };
  }

  constructor(private http: HttpClient) { }
  private log(message: string) { }





  //   addTodo(todoRequest: Omit<ITodo, 'id' | 'isComplete'>) {
//     return this.http.post<ITodo>('/api/todos', { ...todoRequest, isComplete: false });
// }

  login(user: IUser) {
    console.log('in login service and the user is:',user);
    return this.http.post<any>(`${this.URL}/users/login`, user);
  }

  register(user: any): Observable<any> {
    console.log('in register service the user is ',user);
    return this.http.post<any>(`${this.URL}/users/register`, user);
  }

  getTodos(): Observable<ITodo[]> {
    console.log('in service getTodos')
    return this.http.get<ITodo[]>(`${this.URL}/todos`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json"
      }
    })
      .pipe(
        tap(_ => {
          console.log("getToken()", getToken())
        }
        ),
        catchError(this.handleError<ITodo[]>('getTodos', []))
      );
  }

  getTodo(id: number): Observable<ITodo> {
    const url = `${this.URL}/todos/${id}`;
    return this.http.get<ITodo>(url).pipe(
      tap(_ => this.log(`fetched todo id=${id}`)),
      catchError(this.handleError<ITodo>(`getTodo id=${id}`))
    );
  }

  updateTodo(todo: ITodo): Observable<any> { //any because its not return something, just update the DB
    return this.http.put(`${this.URL}/todos/${todo.ID}/toggleComplete`, todo, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json"
      }
    }).pipe(  //the first param is url the second body and the third more options
      tap((response) => {
        this.log(`updated todo id=${todo.ID}`);
        //this.message = response.msg;
      }),
      catchError(this.handleError<any>('updateTodo'))
    );
  }



  addTodo(todoRequest: Omit<ITodo, 'ID' | 'Complete'>) {
    console.log('in service add-', todoRequest);

    return this.http.post<ITodo>(`${this.URL}/todos`, todoRequest, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json"
      }
    }).pipe(
      tap((newTodo: ITodo) => {
        this.log(`added todo id=${newTodo.ID}`);
      }),
      catchError(this.handleError<ITodo>('addTodo'))
    );
  }

  deleteTodo(todo: ITodo | number): Observable<ITodo> {
    console.log({ todo })
    const id = typeof todo === 'number' ? todo : todo.ID;
    console.log({ id });
    const url = `${this.URL}/todos/${id}`;

    return this.http.delete<ITodo>(url, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json"
      }
    }).pipe(
      tap(_ => this.log(`deleted todo id=${id}`)),
      catchError(this.handleError<ITodo>('deleteTodo'))
    );
  }
}
