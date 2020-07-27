import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http'; //http in angular, with this we do the endpoints like axios and fetch
import {StoreModule, Store} from '@ngrx/store';
import {TodoEffects} from 'src/store/effects';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoComponent } from './todo/todo.component';
import { CreateTodosComponent } from './create-todos/create-todos.component';
import { HeaderComponent } from './header/header.component';
import { DisplayComponent } from './display/display.component';
import { todosReducer, ITodosState,  } from 'src/store/reducer';
import { userReducer  } from 'src/store/userReducer';
import { EffectsModule } from '@ngrx/effects';

export interface IState {
  todos: ITodosState;
}

export interface IUserState{
  messages: ITodosState
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    TodoListComponent,
    TodoComponent,
    CreateTodosComponent,
    HeaderComponent,
    DisplayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot({todos: todosReducer, users: userReducer}),
    EffectsModule.forRoot([TodoEffects]),
    StoreDevtoolsModule.instrument({  
   }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
