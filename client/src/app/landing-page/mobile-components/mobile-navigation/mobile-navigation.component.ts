import { Dialog } from '@angular/cdk/dialog';
import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/services/authentication/authentication.service';

@Component({
  selector: 'app-mobile-navigation',
  templateUrl: './mobile-navigation.component.html',
  styleUrls: ['./mobile-navigation.component.scss']
})
export class MobileNavigationComponent implements OnInit {

  constructor(private authService: AuthenticationService,private router: Router){}

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

  openAuthDialog(){
    this.authService.openLoginPage();
  }

}
