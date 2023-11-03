import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IMessages } from '../../interfaces/IMessages';
import { BehaviorSubject, tap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { SnackbarManagmentService } from '../snackbar-managment/snackbar-managment.service';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  private receivedMessagesSubject = new BehaviorSubject<IMessages[] | undefined>(undefined);
  private sentMessagesSubject = new BehaviorSubject<IMessages[] | undefined>(undefined);

  receivedMesasges = this.receivedMessagesSubject.asObservable();
  sentdMesasges = this.sentMessagesSubject.asObservable();




  constructor(private http: HttpClient, private dialog: MatDialog, private snackbar: SnackbarManagmentService) {
    this.getReceivedMessages();
    this.getSentMessages();
   }



  sendMessage(message:{content:string,subject: string, recipient_email?:string}){
    message.recipient_email = '';
    return this.http.post(`${environment.baseUrl}api/v1/user/messages/send/`, message)
    .pipe(tap(()=>{
      this.snackbar.openNotify("Message was sent!");
      this.getSentMessages()
    }))
  }

  getReceivedMessages(){
    return this.http.get<IMessages[]>(`${environment.baseUrl}api/v1/user/messages/received/`)
    .subscribe(val=>{
      this.receivedMessagesSubject.next(val);
    })
  }

  getSentMessages(){
    return this.http.get<IMessages[]>(`${environment.baseUrl}api/v1/user/messages/sent/`)
    .subscribe(val=>{
      this.sentMessagesSubject.next(val);
    })
  }
}
