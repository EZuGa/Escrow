import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IFolder } from '../../interfaces/IFolder';
import { IFile } from '../../interfaces/IFile';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class ContractsService {

  private allFoldersSubject = new BehaviorSubject<IFolder[] | undefined>(undefined);
  allFolders = this.allFoldersSubject.asObservable();


  constructor(private http: HttpClient, private dialog:MatDialog) {
    this.getAllFolders();
   }


  private getAllFolders(){

    this.http.get<IFolder[]>(`${environment.baseUrl}api/v1/user/directories/`)
    .subscribe(val=>{
      this.allFoldersSubject.next(val);
    });

  }

  createFolder(folderName: string){
    return this.http.post(`${environment.baseUrl}api/v1/user/directories/create/`,{name: folderName})
  }

  getFiles(folderID:string){
    return this.http.get<IFile[]>(`${environment.baseUrl}api/v1/user/directories/${folderID}/files/`)
  }
}
