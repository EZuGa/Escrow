import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-personal-cabinet-view',
  templateUrl: './personal-cabinet-view.component.html',
  styleUrls: ['./personal-cabinet-view.component.scss']
})
export class PersonalCabinetViewComponent {

  constructor(private router: Router){}

  menuActive = false;

  closeMenu(){
    this.menuActive = false;
  }


  signOut(){
    localStorage.clear();
    this.router.navigateByUrl('');
  }
}
