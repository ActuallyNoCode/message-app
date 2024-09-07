import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(3101, {
  cors: {
    origin: '*',
  },
})
export class MessagesGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  // Emit an event to all connected clients on new connection
  async handleConnection(client: Socket) {
    this.server.emit('connection', 'New client connected');
  }

  async handleDisconnect() {}

  @SubscribeMessage('message')
  handleMessage(
    @MessageBody()
    content: {
      chatId: string;
      message: string;
    },
    client: Socket,
  ): void {
    this.server.emit('message', content.message);
  }

  @SubscribeMessage('join')
  handleJoin(@MessageBody() ChatId: string, client: Socket): void {
    console.log(ChatId);
    client.join(ChatId);
  }
}
