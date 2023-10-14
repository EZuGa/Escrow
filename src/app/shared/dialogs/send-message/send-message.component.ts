import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MessagesService } from '../../services/messages/messages.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-send-message',
  templateUrl: './send-message.component.html',
  styleUrls: ['./send-message.component.scss']
})
export class SendMessageComponent {

  messageForm = this.fb.group({
    content: ['', Validators.required],
    subject: ['', Validators.required]
  })

  constructor(private fb: NonNullableFormBuilder,private messageService: MessagesService, private dialog: MatDialog){}

  sendMessage(){
      this.messageService.sendMessage(this.messageForm.getRawValue());
  }

  closeDialog(){
    console.log("ABC")
    // this.messageService.closeDialogs();
  }

}
