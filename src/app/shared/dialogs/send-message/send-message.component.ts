import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MessagesService } from '../../services/messages/messages.service';

@Component({
  selector: 'app-send-message',
  templateUrl: './send-message.component.html',
  styleUrls: ['./send-message.component.scss']
})
export class SendMessageComponent {

  @ViewChild('message') message!:ElementRef;

  constructor(private messageService: MessagesService){}

  sendMessage(){
        this.messageService.sendMessage(this.message.nativeElement.value);
  }

}
