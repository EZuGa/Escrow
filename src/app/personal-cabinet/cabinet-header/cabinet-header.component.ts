import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'cabinet-header',
  templateUrl: './cabinet-header.component.html',
  styleUrls: ['./cabinet-header.component.scss']
})
export class CabinetHeaderComponent implements OnInit {

  @Output() menuClick = new EventEmitter<void>();

  header: string = "";

  isInFiles = false;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}


  ngOnInit(): void {
    this.isInFiles = this.isInFilesCheck(this.router.url);
    this.header = this.getHeader(this.router.url)
    //shesacvlelia
  }

  private isInFilesCheck(currentRoute: string){
    return currentRoute === "/personal-cabinet/contracts/files"
  }

  private getHeader(route:string){
    switch(route){
      case '/personal-cabinet/my-profile':
        return "My profile"
        break;
      case "/personal-cabinet/messages":
        return "Messages"
    }

    return ""
  }

}
