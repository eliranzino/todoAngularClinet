import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ITodosState } from 'src/store/reducer';
import { loginAction } from 'src/store/actions';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userName = ''
  password = ''


  constructor(private store: Store<ITodosState>, private fb: FormBuilder) { }

  loginForm = this.fb.group({
    userName: this.fb.control('', Validators.required),
    password: this.fb.control('', Validators.required),
  })
  ngOnInit(): void {
  }

  login() {
    const { userName, password } = this.loginForm.value;
    console.log('in login component', userName, password)
    userName.trim();
    password.trim();

    if (!userName) { return; }
    if (!password) { return; }

    const userDetails = { userName, password }
    console.log("userDetails", userDetails)
    this.store.dispatch(loginAction({ user: userDetails }))
    this.loginForm.reset();
  }
}
