import { Component, Inject, Optional } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ContractsService } from '../../services/contracts/contracts.service';
import { finalize } from 'rxjs';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-folder',
  templateUrl: './create-folder.component.html',
  styleUrls: ['./create-folder.component.scss']
})
export class CreateFolderComponent {

  isLoading = false;

  folderName = new FormControl('', Validators.required)
  

  constructor(private contractsService: ContractsService, private dialogRef: MatDialogRef<CreateFolderComponent>){}

  createFolder(){
    const folderName = this.folderName.value;
    this.isLoading = true;

    this.contractsService.createFolder(folderName!)
    .pipe(finalize(()=>this.isLoading = false))
    .subscribe(res=>{
      this.dialogRef.close();
    });
  }

}
