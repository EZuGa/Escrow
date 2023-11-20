import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { IFile, IFileWrap } from 'src/app/shared/interfaces/IFile';
import { ContractsService } from 'src/app/shared/services/contracts/contracts.service';

@Component({
  selector: 'app-contracts-files',
  templateUrl: './contracts-files.component.html',
  styleUrls: ['./contracts-files.component.scss']
})
export class ContractsFilesComponent implements OnInit{

  allFiles!: Observable<IFile[]>;
  FolderName = '';
  FolderStatus = '';

  folderID!: string;


  constructor(private contractsService: ContractsService, private route: ActivatedRoute, private dialog: MatDialog){}

  ngOnInit(): void {
    const folderId = this.route.snapshot.paramMap.get('file_name')!;
    this.folderID = folderId;
    this.allFiles = this.contractsService.getFiles(folderId)
    .pipe(tap((v : any)=>{
      this.FolderName = v.directory_name;
      this.FolderStatus = v.directory_status
    }))
    .pipe(map( (v: any)=>v.data));  
  }

  uploadFile(event:any){
    const file:File = event.target.files[0];
    this.contractsService.uploadFile(file, this.folderID, file.name)
  }


}
