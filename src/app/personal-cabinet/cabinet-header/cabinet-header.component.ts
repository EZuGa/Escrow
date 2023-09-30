import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'cabinet-header',
  templateUrl: './cabinet-header.component.html',
  styleUrls: ['./cabinet-header.component.scss']
})
export class CabinetHeaderComponent implements OnInit {

    isInFiles = false;

  constructor(private router: Router) {}


  ngOnInit(): void {
    this.isInFiles = this.isInFilesCheck(this.router.url);

    this.router.events
    .pipe(filter(route=> route instanceof NavigationEnd))
    .subscribe(router=>{
      const route = (router as NavigationEnd).urlAfterRedirects;
      this.isInFiles = this.isInFilesCheck(route);
    })
  }

  private isInFilesCheck(currentRoute: string){
    return currentRoute === "/personal-cabinet/contracts/files"
  }

}
