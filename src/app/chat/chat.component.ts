import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { io } from 'socket.io-client';

@Component({
  selector: 'app-chat',
  standalone:true,
  imports:[CommonModule,FormsModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent {
// Change this line to your server URL
private socket:any ;
  messages: string[] = [];
  messageInput: string = '';

  ngOnInit() {
    // Connect to the server
    this.socket = io('http://localhost:3000', { transports: ['websocket', 'polling'] });

    // Listen for incoming messages
    this.socket.on('message', (message: string) => {
      this.messages.push(message);
    });
  }

  sendMessage() {
    // Send the message to the server
    this.socket.emit('message', this.messageInput);
    this.messageInput = ''; // Clear the input field
  }
}
