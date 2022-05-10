import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'practical_task';
  isLoggedIn: any;
  constructor(private router: Router) {}
  ngOnInit() {
    let user = localStorage.getItem('username');
    this.isLoggedIn = user ? true : false;
  }

  logout() {
    localStorage.removeItem('username');
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('latestId');
    this.router.navigate(['login']);
  }

  home() {
    this.router.navigate(['']);
  }
}
