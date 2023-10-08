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
  sentdMesasges = this.receivedMessagesSubject.asObservable();




  constructor(private http: HttpClient) { }



  sendMessage(){
    this.http.post(`${environment.baseUrl}api/v1/user/messages/send/`,
    {
      content:'es unda mogsvloda',
      recipient_email: 'g@gmail.com',
      subject: 'Mogivida?'
    })
    // .subscribe();
  }

  getReceivedMessages(){
    return this.http.get<IMessages[]>(`${environment.baseUrl}api/v1/user/messages/received/`)
  }

  getSentMessages(){
    return this.http.get<IMessages[]>(`${environment.baseUrl}api/v1/user/messages/sent/`)
  }
}
