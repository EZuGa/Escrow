import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { takeWhile } from 'rxjs';
import { SendMessageComponent } from 'src/app/shared/dialogs/send-message/send-message.component';
import { IMessages } from 'src/app/shared/interfaces/IMessages';
import { MessagesService } from 'src/app/shared/services/messages/messages.service';

@Component({
  selector: 'app-cabinet-messages',
  templateUrl: './cabinet-messages.component.html',
  styleUrls: ['./cabinet-messages.component.scss']
})
export class CabinetMessagesComponent implements OnInit, OnDestroy{

  componentAlive$ = true;

  onReceivedPage = true;

  receivedMessages!: IMessages[];
  sentMessages!: IMessages[];

  interval : any;


  constructor(private messageService: MessagesService, private dialog: MatDialog){}



  ngOnInit(): void {
    document.getElementById('cabinetWraps')!.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
  });


    this.messageService.sentdMesasges
    .pipe(
      takeWhile(v=>this.componentAlive$)
    )
    .subscribe(messages=>{
      this.sentMessages = messages!
    });

    this.messageService.receivedMesasges
    .pipe(
      takeWhile(v=>this.componentAlive$)
    )
    .subscribe(messages=>{
      this.receivedMessages = messages!;
    });


    this.interval = setInterval(()=>{
      this.messageService.getReceivedMessages();
      this.messageService.getSentMessages();
    },30000)
  }

  sendMessage(){
    this.dialog.open(
      SendMessageComponent,
      {
        width: '80%',
      }
      );
  }
  
  ngOnDestroy(): void {
    clearInterval(this.interval)
    this.componentAlive$ = false;
  }
}
