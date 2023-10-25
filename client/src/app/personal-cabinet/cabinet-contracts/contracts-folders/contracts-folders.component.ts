import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { takeWhile, tap } from 'rxjs';
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
    this.getAllFolders();
    this.filterByWord();
  }

  filterByWord(){
    this.contractService.searchedWord
    .pipe(takeWhile(v=>this.componentAlive$))
    .subscribe(keyword=>{
      this.foldersToRender = this.allFolders?.filter(val=>val.name.toLocaleLowerCase().includes(keyword.toLocaleLowerCase()));

      this.resetPaging();
    })
  }


  chooseFolder(folder:IFolder){
    this.router.navigate(['personal-cabinet','contracts',folder.id])
  }

  toggleMobileFilter(){
    this.mobileFilterActive = !this.mobileFilterActive;
  }

  createFolder(){
    this.dialog.open(CreateFolderComponent);
  }


  clearFilter(){
    this.folderFilter.reset();
    this.foldersToRender = [...this.allFolders!];
    this.resetPaging();
  }

  getAllFolders(){
    this.contractService.allFolders.
    pipe(
      takeWhile(v=>this.componentAlive$),
      tap(val => {
        if(val){
          this.allFolders = val;
          this.foldersToRender = [...this.allFolders];
          this.resetPaging();
        }
  })).subscribe();
  }

  applyFilter(){
    const filterValues = this.folderFilter.getRawValue();
    this.foldersToRender = this.allFolders?.filter(val=> {
      return (
        (!filterValues.dateFrom || new Date(val.updated_at).setHours(0,0,0,0) >= new Date(filterValues.dateFrom).setHours(0,0,0,0))
        &&
        (!filterValues.dateTo || new Date(val.updated_at).setHours(0,0,0,0) <= new Date(filterValues.dateTo).setHours(0,0,0,0))
        &&
        (!filterValues.status || filterValues.status === val.status)
        )
    })

    this.resetPaging();
  }

  resetPaging(){
    this.lastPage = Math.ceil(this.foldersToRender!.length / 12) ;
    this.currentPage = 1;
    this.mobileFilterActive = false;
  }


  nextPage(){
    this.currentPage++;
  }

  perviousPage(){
    this.currentPage--;
  }


  ngOnDestroy(): void {
    this.componentAlive$ = false;
  }


  //ყველაზე კაი ვარიანტი - foldersToRender გადააკეთე filteredFolder -ზე და ჰტმ-ში გააკეთე სლაისი
}
