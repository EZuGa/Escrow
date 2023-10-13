import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, takeUntil, takeWhile } from 'rxjs';

@Component({
  selector: 'cabinet-header',
  templateUrl: './cabinet-header.component.html',
  styleUrls: ['./cabinet-header.component.scss']
})
export class CabinetHeaderComponent implements OnInit {
  componentAlive$ = true;


  @Output() menuClick = new EventEmitter<void>();

  header: string = "";

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}


  ngOnInit(): void {
    this.header = this.getHeader(this.router.url)

    this.router.events
    .pipe(
      filter(route=> route instanceof NavigationEnd),
      takeWhile(v=>this.componentAlive$)
      )
    .subscribe(router=>{
      const route = (router as NavigationEnd).urlAfterRedirects;
      this.header = this.getHeader(route);
    })

  }

  private getHeader(route:string){
    console.log(route)
    switch(route){
      case "/personal-cabinet/my-profile":
        return "My profile"
      case "/personal-cabinet/messages":
        return "Messages"
      case "/personal-cabinet/contracts":
        return "Contracts"
      case "/personal-cabinet/balance":
        return "Balance"
    }

    return "Files"
  }

  ngOnDestroy(): void {
    this.componentAlive$ = false;
  }

}
