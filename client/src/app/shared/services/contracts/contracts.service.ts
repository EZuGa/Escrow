import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, tap } from 'rxjs';
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

  searchedWord:Subject<string> = new Subject();

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

  uploadFile(file:File, folderId:string, fileName:string){
    
    const formData = new FormData();

    formData.append("file", file);
    formData.append("name", fileName)

    this.http.post(`${environment.baseUrl}api/v1/user/directories/${folderId}/files/upload/`, formData)
    .subscribe()
  }
}
