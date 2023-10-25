import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IFile } from 'src/app/shared/interfaces/IFile';
import { ContractsService } from 'src/app/shared/services/contracts/contracts.service';

@Component({
  selector: 'app-contracts-files',
  templateUrl: './contracts-files.component.html',
  styleUrls: ['./contracts-files.component.scss']
})
export class ContractsFilesComponent implements OnInit{

  allFiles!: Observable<IFile[]>;

  folderID!: string;


  constructor(private contractsService: ContractsService, private route: ActivatedRoute, private dialog: MatDialog){}

  ngOnInit(): void {
    const folderId = this.route.snapshot.paramMap.get('file_name')!;
    this.folderID = folderId;
    this.allFiles = this.contractsService.getFiles(folderId);  
  }

  uploadFile(event:any){
    console.log("ABC")
    const file:File = event.target.files[0];
    console.log("AQAA", file)
    this.contractsService.uploadFile(file, this.folderID, file.name)
  }


}
