import { Component, OnInit } from '@angular/core';
import { MessagingService } from '../messaging.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  messages: string[] = [];

  constructor(private msgService: MessagingService) { }

  ngOnInit() {
    this.msgService.messageSent.subscribe((msg: string) => {
      this.messages.push(msg);
      console.log(this.messages);
    });
  }

}
