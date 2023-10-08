import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
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
  



  constructor(private contractService: ContractsService){}

  ngOnInit(): void {
    this.allFolders = this.contractService.allFolders;
  }


  createFolder(){
    this.contractService.createFolder().subscribe();
  }


  changePage(page:number){
    console.log(page)
    this.currentPage = page;
  }

}
