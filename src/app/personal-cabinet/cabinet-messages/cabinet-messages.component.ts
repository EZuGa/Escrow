import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { IMessages } from 'src/app/shared/interfaces/IMessages';
import { MessagesService } from 'src/app/shared/services/messages/messages.service';

@Component({
  selector: 'app-cabinet-messages',
  templateUrl: './cabinet-messages.component.html',
  styleUrls: ['./cabinet-messages.component.scss']
})
export class CabinetMessagesComponent implements OnInit{

  onReceivedPage = true;

  receivedMessages!: IMessages[];
  sentMessages!: IMessages[];


  constructor(private messageService: MessagesService){}



  ngOnInit(): void {

    this.messageService.getSentMessages().subscribe(messages=>{
      this.sentMessages = messages
    });

    this.messageService.getReceivedMessages().subscribe(messages=>{
      this.receivedMessages = messages;
    });
  }

  sendMessage(){
    // this.messageService.sendMessage();
  }
  

}
