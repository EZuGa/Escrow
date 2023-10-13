import { Component, OnInit } from '@angular/core';
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


  constructor(private contractsService: ContractsService, private route: ActivatedRoute){}

  ngOnInit(): void {
    const fileID = this.route.snapshot.paramMap.get('file_name');

    this.allFiles = this.contractsService.getFiles(fileID!);



    
  }

}
