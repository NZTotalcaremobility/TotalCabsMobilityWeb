import { environment } from 'src/environments/environment';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
 // adminbaseURL: string = environment.adminBaseURL
  customOptions: OwlOptions = {
    loop: true,
    // mouseDrag: false,
    // touchDrag: false,
    // pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['<img src="../../assets/images/left-img.svg" />', '<img src="../../assets/images/rit-img.svg" />'],
    nav: true,
    items: 1,
    autoplay: true,
    // responsive: {
    //   0: {
    //     items: 1
    //   },
    //   400: {
    //     items: 2
    //   },
    //   740: {
    //     items: 3
    //   },
    //   940: {
    //     items: 4
    //   }
    // },
  }

  thefleet: OwlOptions = {
    loop: true,
    // mouseDrag: true,
    // touchDrag: false,
    // pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['ds', 'sdf'],
    nav: false,
    items: 1,
    autoplay: true,
    margin: 10,
    responsive: {
      0: {
        items: 1,
        nav: true
      },
      480: {
        items: 2,
        nav: false
      },
      767: {
        items: 3,
        nav: false
      },
      1000: {
        items: 5,
        nav: true,
        loop: false,
        margin: 20
      }
    },
  }
  constructor(private router: Router) {
  }

  ngOnInit(): void {
    // this.router.navigateByUrl('/user/page/profile')
    this.router.navigateByUrl('/')
  }
  logout() {
    localStorage.removeItem('user_login')
    this.router.navigateByUrl('/login')
  }
}
