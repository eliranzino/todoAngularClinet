import { Component, OnInit, Input } from '@angular/core';
import { ITodo } from '../todo';
import { Store } from '@ngrx/store';
import { IState } from '../app.module';
import { deleteTodo, updateTodo } from 'src/store/actions';


@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  @Input() todo: ITodo;

  constructor(private store: Store<IState>) { }

  ngOnInit(): void {
  }

  delete(todo: ITodo): void {
    console.log('todo', todo);
    this.store.dispatch(deleteTodo({ todo }));
  }


  handlePut(todo: ITodo): void {
    console.log({todo});
   this.store.dispatch(updateTodo({todo}));
  }

}
