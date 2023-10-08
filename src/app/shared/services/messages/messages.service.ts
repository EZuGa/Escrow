import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IMessages } from '../../interfaces/IMessages';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  private receivedMessagesSubject = new BehaviorSubject<IMessages[] | undefined>(undefined);
  private sentMessagesSubject = new BehaviorSubject<IMessages[] | undefined>(undefined);

  receivedMesasges = this.receivedMessagesSubject.asObservable();
  sentdMesasges = this.sentMessagesSubject.asObservable();




  constructor(private http: HttpClient) {
    this.getReceivedMessages();
    this.getSentMessages();
   }



  sendMessage(message:string){
    this.http.post(`${environment.baseUrl}api/v1/user/messages/send/`,
    {
      content: message,
      recipient_email: 'g@gmail.com',
      subject: "Subject"
    })
    .subscribe();
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
