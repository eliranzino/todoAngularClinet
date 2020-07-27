import { Component, OnInit } from '@angular/core';
import { ITodo } from '../todo';
import { Store } from '@ngrx/store';
import { FormBuilder, Validators } from '@angular/forms';
import { addTodo } from 'src/store/actions';



@Component({
  selector: 'app-create-todos',
  templateUrl: './create-todos.component.html',
  styleUrls: ['./create-todos.component.css']
})
export class CreateTodosComponent implements OnInit {

  constructor(private store: Store, private fb: FormBuilder) { }

  createTodoForm = this.fb.group({
    description: this.fb.control('', Validators.required),
    date: this.fb.control('', Validators.required),
  })

  createTodo(){
    const { description, date } = this.createTodoForm.value;
    description.trim();
    date.trim();

    if (!description) { return; }
    if (!date) { return; }
    const todoRequest = { description, date }
    console.log('todoRequest',todoRequest)
    this.store.dispatch(addTodo({ todoRequest }))

  }


  ngOnInit(): void {
  }


}
