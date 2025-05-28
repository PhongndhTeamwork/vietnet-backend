import {
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:3000',
    credentials: true,
  },
})
export class DataGateway {
  @WebSocketServer()
  server: Server;

  sendMarketDataToClients(data: any) {
    this.server.emit('market:update', data); // Broadcast to all
  }
}
