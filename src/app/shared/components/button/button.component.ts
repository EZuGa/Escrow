import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {

  @Input() disabled = false;
  @Input() isLoading = false;

  onClick(event:any){
    if(this.isLoading){event.preventDefault()}
  }

}
