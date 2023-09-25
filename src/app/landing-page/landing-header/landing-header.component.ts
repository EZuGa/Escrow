import { Component } from '@angular/core';

@Component({
  selector: 'landing-header',
  templateUrl: './landing-header.component.html',
  styleUrls: ['./landing-header.component.scss']
})
export class LandingHeaderComponent {

  hamburgerActive = false;

  toggleHamburger(){
    this.hamburgerActive =  !this.hamburgerActive;
  }

}
