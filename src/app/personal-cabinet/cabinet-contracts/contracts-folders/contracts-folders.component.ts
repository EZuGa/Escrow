import { Dialog } from '@angular/cdk/dialog';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable, takeWhile, tap } from 'rxjs';
import { CreateFolderComponent } from 'src/app/shared/dialogs/create-folder/create-folder.component';
import { IFolder } from 'src/app/shared/interfaces/IFolder';
import { ContractsService } from 'src/app/shared/services/contracts/contracts.service';

@Component({
  selector: 'app-contracts-folders',
  templateUrl: './contracts-folders.component.html',
  styleUrls: ['./contracts-folders.component.scss']
})
export class ContractsFoldersComponent implements OnInit, OnDestroy{

  componentAlive$ = true;

  allFolders!: IFolder[] | undefined;
  foldersToRender!: IFolder[] | undefined;
  currentPage = 1;
  lastPage = 1;

  mobileFilterActive = false;

  folderFilter = this.fb.group({
      dateFrom: [''],
      dateTo: [''],
      status: ['']
  }) 
  



  constructor(private contractService: ContractsService, private fb: FormBuilder, private router: Router, private dialog: MatDialog){}

  ngOnInit(): void {
    this.contractService.allFolders.
      pipe(
        takeWhile(v=>this.componentAlive$),
        tap(val => {
          if(val){
            this.lastPage = Math.ceil(val.length / 12) ;
            this.allFolders = val;
            this.foldersToRender = this.allFolders.slice( 0, 12);
          }
    })).subscribe();
  }


  applyFilter(){
    const filterValues = this.folderFilter.getRawValue();

    const filteredData = this.allFolders?.filter(val=> {
      // console.log((!filterValues.dateFrom || new Date(filterValues.dateFrom!) <= new Date(val.created_at)), (!filterValues.dateTo || new Date(filterValues.dateTo!) >= new Date(val.created_at)))
      return (
      (!filterValues.dateFrom || new Date(filterValues.dateFrom!) <= new Date(val.created_at))
      && 
      (!filterValues.dateTo || new Date(filterValues.dateTo!) >= new Date(val.created_at))
      )
    });

    this.currentPage = 1;
    this.lastPage = Math.ceil(filteredData!.length / 12) ;

    this.foldersToRender = filteredData?.slice(0,12);

    this.mobileFilterActive = false;
  }

  clearFilter(){
    this.folderFilter.reset();
    this.foldersToRender = [...this.allFolders!];

    this.mobileFilterActive = false;
  }


  createFolder(){
    this.dialog.open(CreateFolderComponent);
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

  chooseFolder(folder:IFolder){
    this.router.navigate(['personal-cabinet','contracts',folder.id])
  }

  toggleMobileFilter(){
    this.mobileFilterActive = !this.mobileFilterActive;
  }

  ngOnDestroy(): void {
    this.componentAlive$ = false;
  }


  //ყველაზე კაი ვარიანტი - foldersToRender გადააკეთე filteredFolder -ზე და ჰტმ-ში გააკეთე სლაისი
}
