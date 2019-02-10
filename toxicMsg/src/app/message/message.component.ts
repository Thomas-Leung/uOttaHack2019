import { Component, OnInit } from '@angular/core';
import { MessagingService } from '../messaging.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  message: string;

  constructor(private messagingService: MessagingService) { }

  ngOnInit() {
  }

  onSendMessage() {
    if ( !(this.message == null || this.message === '')) {
      this.messagingService.messageSent.next(this.message);
      console.log(this.message);
    }
  }
}
