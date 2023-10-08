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
      console.log(messages[0].timestamp)
      const b = new Date(messages[0].timestamp);

      console.log(`${b.getDay()}.${b.getMonth()}.${b.getUTCFullYear().toString().substr(-2)} ${b.getTime()}`)

      console.log()

      this.receivedMessages = messages;
    });
  }

  sendMessage(){
    // this.messageService.sendMessage();
  }
  

}
