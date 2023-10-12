import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AboutUsComponent } from '../about-us/about-us.component';
import { filter } from 'rxjs';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit{

  @ViewChild("aboutUs") aboutUs!: AboutUsComponent;


  constructor(private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    // if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {
    //   console.info( "This page is reloaded" );
    // } else {
    //   console.info( "This page is not reloaded");
    // }
    const fragmetn = this.route.snapshot.fragment;
      
    if(fragmetn){
      document.getElementById(fragmetn)?.scrollIntoView();
    }
  }

}
