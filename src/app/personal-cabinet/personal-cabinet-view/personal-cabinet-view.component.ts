import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Route, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-personal-cabinet-view',
  templateUrl: './personal-cabinet-view.component.html',
  styleUrls: ['./personal-cabinet-view.component.scss']
})
export class PersonalCabinetViewComponent {

  // currentRoute!: string;

  // constructor(private router: Router) {}


  // ngOnInit(): void {
  //   this.currentRoute = this.getChildRoute(this.router.url);

  //   this.router.events
  //   .pipe(filter(route=> route instanceof NavigationEnd))
  //   .subscribe(router=>{
  //     const route = (router as NavigationEnd).urlAfterRedirects;

  //     this.currentRoute = this.getChildRoute(route);

  //   })
  // }


  // private getChildRoute(route: string){
  //   return route.substring(route.lastIndexOf("/") + 1);
  // }
  menuActive = false;

  closeMenu(){
    this.menuActive = false;
  }
}
