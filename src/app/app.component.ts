import { filter } from 'rxjs/operators';
import { Router, NavigationEnd } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';

  previousUrl: string = null;
  currentUrl: string = null;

  constructor(private router: Router) { }

  ngOnInit() {
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      console.log('this workin step1')
      this.previousUrl = this.currentUrl;
      this.currentUrl = event.url;
    });
  }
}
