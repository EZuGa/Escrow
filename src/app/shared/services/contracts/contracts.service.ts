import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IFolder } from '../../interfaces/IFolder';

@Injectable({
  providedIn: 'root'
})
export class ContractsService {

  private allFoldersSubject = new BehaviorSubject<IFolder[] | undefined>(undefined);
  allFolders = this.allFoldersSubject.asObservable();


  constructor(private http: HttpClient) {
    this.getAllFolders();
   }


   folder = 16

  private getAllFolders(){

    this.http.get<IFolder[]>(`${environment.baseUrl}api/v1/user/directories/`)
    .subscribe(val=>{
      this.allFoldersSubject.next(val);
    });

  }

  createFolder(){
    this.folder++;
    return this.http.post(`${environment.baseUrl}api/v1/user/directories/create/`,{name: "Folder "+ this.folder})
  }
}
