import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { io } from 'socket.io-client';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent {
  // Change this line to your server URL
  private socket: any;
  messages: any[] = [];
  messageInput: string = '';

  ngOnInit() {
    // Connect to the server
    this.socket = io('http://localhost:3000', {
      transports: ['websocket', 'polling'],
    });

    // Listen for incoming messages
    this.socket.on('message', (message: any) => {
      console.log(message);
      if (message.msg) {
        this.messages.push({ msg: message.msg, isSent: false });
      }
    });
  }

  sendMessage() {
    // Send the message to the server
    this.socket.emit('message',{ msg: this.messageInput, isSent: true });
    this.messages.push({ msg: this.messageInput, isSent: true });
    this.messageInput = ''; // Clear the input field
  }
}
