import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MessageComponent } from './message/message.component';
import { BoardComponent } from './board/board.component';
import { SentMessageComponent } from './board/sent-message/sent-message.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MessageComponent,
    BoardComponent,
    SentMessageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
