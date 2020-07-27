import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectMessages } from 'src/store/selectors';
import { IUserState } from 'src/store/userReducer';


@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {
  message$: Observable<any>;

  constructor(private store: Store<IUserState>) {
    this.message$ = store.select(selectMessages)
   }


  ngOnInit(): void {
  }

}
