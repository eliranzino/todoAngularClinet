import { Component, OnInit } from '@angular/core';
import { ITodo } from '../todo';
import { Store, select } from '@ngrx/store';
import { IState } from '../app.module';
import { Observable } from 'rxjs';
import { getTodos, deleteTodo } from 'src/store/actions';
import { selectAllTodos } from 'src/store/selectors';



@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  todos$: Observable<ITodo[]>;


  constructor(private store: Store<IState>) {
    this.todos$ = store.select(selectAllTodos)
  }


  ngOnInit() {
    console.log(" in componenet todoList - GET TODOS", console.log(this.todos$))
    this.store.dispatch(getTodos());
  }

}

