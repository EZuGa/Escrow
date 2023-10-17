import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OurServicesService } from 'src/app/shared/services/our-services/our-services.service';

@Component({
  selector: 'our-services',
  templateUrl: './our-services.component.html',
  styleUrls: ['./our-services.component.scss']
})
export class OurServicesComponent {

  get allServices(){
    return this.ourServicesService.allServices;
  }


  constructor(private ourServicesService: OurServicesService, private router: Router){}


  clickService(service: any){
    this.router.navigate(["our-services",service.name])
  }

}
