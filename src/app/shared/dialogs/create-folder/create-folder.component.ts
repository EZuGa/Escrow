import { Component, Inject, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-folder',
  templateUrl: './create-folder.component.html',
  styleUrls: ['./create-folder.component.scss']
})
export class CreateFolderComponent {
  

  constructor(private dialogRef: MatDialogRef<CreateFolderComponent>){}

  createFolder(opa:any){
    // console.log(opa)

    console.log(this.dialogRef)

    // this.dialogRef.close()
  }

}
