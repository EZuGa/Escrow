import { Component, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { IFolder } from 'src/app/shared/interfaces/IFolder';
import { ContractsService } from 'src/app/shared/services/contracts/contracts.service';

@Component({
  selector: 'app-contracts-folders',
  templateUrl: './contracts-folders.component.html',
  styleUrls: ['./contracts-folders.component.scss']
})
export class ContractsFoldersComponent implements OnInit{

  allFolders!: Observable<IFolder[] | undefined>;
  currentPage = 1;
  lastPage = 1;
  



  constructor(private contractService: ContractsService){}

  ngOnInit(): void {
    this.allFolders = this.contractService.allFolders.
      pipe(tap(val => {
          if(val){
            this.lastPage = Math.ceil(val.length / 12) ;
          }
        }));
  }


  createFolder(){
    this.contractService.createFolder().subscribe();
  }


  changePage(page:number){
    this.currentPage = page;
  }

}
