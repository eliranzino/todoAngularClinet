import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ITodosState } from 'src/store/reducer';
import { FormBuilder, Validators } from '@angular/forms';
import { registerAction } from 'src/store/actions';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  userName = ''
  password = ''

  constructor(private store: Store<ITodosState>, private fb: FormBuilder) { }

  registerForm = this.fb.group({
    userName: this.fb.control('', Validators.required),
    password: this.fb.control('', Validators.required),
  })

  ngOnInit(): void {
  }



  register() {
    const { userName, password } = this.registerForm.value;
    console.log('in register component', userName, password)
    userName.trim();
    password.trim();

    if (!userName) { return; }
    if (!password) { return; }

    const userDetails = { userName, password }
    console.log("userDetails", userDetails)
    this.store.dispatch(registerAction({ user: userDetails }))
    this.registerForm.reset();
  }
}
