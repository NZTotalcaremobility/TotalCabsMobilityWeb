import { CommonService } from './../../services/common.service';
import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  showSidebar: Boolean;

  constructor( public commonservice: CommonService,private router:Router) { }

  ngOnInit(): void {
  }
  logout()
  {
    localStorage.removeItem('user_login')
    this.router.navigateByUrl('/login')
  }
}
