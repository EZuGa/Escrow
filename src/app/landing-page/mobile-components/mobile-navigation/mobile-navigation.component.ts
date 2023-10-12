import { Component, HostListener, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mobile-navigation',
  templateUrl: './mobile-navigation.component.html',
  styleUrls: ['./mobile-navigation.component.scss']
})
export class MobileNavigationComponent implements OnInit {

  router = inject(Router);

  @HostListener('window:resize', ['$event'])
    getScreenSize(event:any) {
    this.ifNotMobileNavigate();
  }


  ngOnInit(): void {
    this.ifNotMobileNavigate();
  }

  private ifNotMobileNavigate(){
    if(window.innerWidth> 950){
      this.router.navigateByUrl('/');
    }
  }

}
