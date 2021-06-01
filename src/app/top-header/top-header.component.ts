import { environment } from 'src/environments/environment';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-top-header',
  templateUrl: './top-header.component.html',
  styleUrls: ['./top-header.component.scss']
})
export class TopHeaderComponent implements OnInit {
  isUserLoggedIn: boolean = false;
  adminbaseURL: string = environment.adminBaseURL

  constructor() {
    this.isUserLoggedIn = localStorage.getItem('user_login') ? true : false
  }

  ngOnInit(): void {
  }

}
