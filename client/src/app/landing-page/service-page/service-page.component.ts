import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { takeWhile } from 'rxjs';
import { OurServicesService } from 'src/app/shared/services/our-services/our-services.service';

@Component({
  selector: 'app-service-page',
  templateUrl: './service-page.component.html',
  styleUrls: ['./service-page.component.scss']
})
export class ServicePageComponent implements OnInit, OnDestroy{

  componentAlive$ = true;

  currentService: any;


  constructor(private ourServicesService: OurServicesService, private activatedRoute: ActivatedRoute, private router: Router){}

  get ourServices(){
    return this.ourServicesService.allServices;
  }

  ngOnInit(): void {
    this.activatedRoute.url
    .pipe(
      takeWhile(v=>this.componentAlive$)
    )
    .subscribe(route=>{
      const currentPath = route[1].path
      this.currentService = this.ourServices.find(service=>service.name === currentPath);



      setTimeout(()=>{  
        document.getElementById(currentPath)?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'center',
      })
      })
    })
  }

  chooseService(service: any){
    this.router.navigate(["our-services",service.name])
  }

  ngOnDestroy(): void {
    this.componentAlive$ = false;
  }

}
