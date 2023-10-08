import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-contracts-footer',
  templateUrl: './contracts-footer.component.html',
  styleUrls: ['./contracts-footer.component.scss']
})
export class ContractsFooterComponent {

  @Output() changePage = new EventEmitter<number>();

  @Input() lastPage = 5;

  currentPage = 1;

  fowrad(){
    if(this.currentPage === this.lastPage)return;
    this.currentPage++;
    this.changePage.emit(this.currentPage);
  }

  backward(){
    if(this.currentPage === 1)return;
    this.currentPage--;
    this.changePage.emit(this.currentPage);
  }

}
