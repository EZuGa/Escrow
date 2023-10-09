import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Observable, tap } from 'rxjs';
import { IFolder } from 'src/app/shared/interfaces/IFolder';
import { ContractsService } from 'src/app/shared/services/contracts/contracts.service';

@Component({
  selector: 'app-contracts-folders',
  templateUrl: './contracts-folders.component.html',
  styleUrls: ['./contracts-folders.component.scss']
})
export class ContractsFoldersComponent implements OnInit{

  allFolders!: IFolder[] | undefined;
  foldersToRender!: IFolder[] | undefined;
  currentPage = 1;
  lastPage = 1;

  folderFilter = this.fb.group({
      dateFrom: [''],
      dateTo: ['']
  }) 
  



  constructor(private contractService: ContractsService, private fb: FormBuilder){}

  ngOnInit(): void {
    this.contractService.allFolders.
      pipe(tap(val => {
          if(val){
            this.lastPage = Math.ceil(val.length / 12) ;
            this.allFolders = val;
            this.foldersToRender = this.allFolders.slice( 0, 12);
          }
    })).subscribe();
  }


  applyFilter(){
    const filterValues = this.folderFilter.getRawValue();
    // console.log(filterValues);


    // console.log()


    const filteredData = this.allFolders?.filter(val=> {
      // console.log((!filterValues.dateFrom || new Date(filterValues.dateFrom!) <= new Date(val.created_at)), (!filterValues.dateTo || new Date(filterValues.dateTo!) >= new Date(val.created_at)))
      return (
      (!filterValues.dateFrom || new Date(filterValues.dateFrom!) <= new Date(val.created_at))
      && 
      (!filterValues.dateTo || new Date(filterValues.dateTo!) >= new Date(val.created_at))
      )
    });

    // console.log(filteredData?.length)

    this.currentPage = 1;
    this.lastPage = Math.ceil(filteredData!.length / 12) ;


    this.foldersToRender = filteredData?.slice(0,12);
  }


  createFolder(){
    this.contractService.createFolder().subscribe();
  }


  changePage(page:number){
    const filterValues = this.folderFilter.getRawValue();

    this.currentPage = page;
    this.foldersToRender = this.allFolders!.filter(val=> {
      // console.log((!filterValues.dateFrom || new Date(filterValues.dateFrom!) <= new Date(val.created_at)), (!filterValues.dateTo || new Date(filterValues.dateTo!) >= new Date(val.created_at)))
      return (
      (!filterValues.dateFrom || new Date(filterValues.dateFrom!) <= new Date(val.created_at))
      && 
      (!filterValues.dateTo || new Date(filterValues.dateTo!) >= new Date(val.created_at))
      )
    })
    .slice((this.currentPage-1) * 12, this.currentPage * 12)
  }

}
