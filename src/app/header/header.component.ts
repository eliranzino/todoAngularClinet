import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { clearToken } from 'src/token';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) { }

  isLoggedIn = !!localStorage.getItem('token');

  logOut() {
    clearToken();
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {
  }

}
