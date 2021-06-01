import { Component, OnInit } from '@angular/core';
import { CommonService } from './../services/common.service';

@Component({
  selector: 'app-userlayout',
  templateUrl: './userlayout.component.html',
  styleUrls: ['./userlayout.component.scss']
})
export class UserlayoutComponent implements OnInit {

  constructor(public commonservice: CommonService) { }

  ngOnInit(): void {
  }

}
