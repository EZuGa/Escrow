import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-contracts-footer',
  templateUrl: './contracts-footer.component.html',
  styleUrls: ['./contracts-footer.component.scss']
})
export class ContractsFooterComponent implements OnChanges{

  @Output() nextPage = new EventEmitter<void>();
  @Output() perviousPage = new EventEmitter<void>();


  @Input() lastPage = 1;

  @Input() currentPage = 1;

  ngOnChanges(changes: SimpleChanges){
  }

  fowrad(){
    if(this.currentPage === this.lastPage)return;
    this.nextPage.emit();
  }

  backward(){
    if(this.currentPage === 1)return;
    this.perviousPage.emit();
  }

}
