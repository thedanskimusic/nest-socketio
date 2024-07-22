import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Server, Socket } from 'socket.io';
import { UserSocketService } from 'src/services/user-socker.service';
import { SocketConstants } from 'src/constants';

const CHAT_MESSAGE = SocketConstants.CHAT_MESSAGE;

@WebSocketGateway({
  cors: {
    origin: '*',
    methods: ["GET", "POST"],
    transports: ['websocket', 'polling'],
    credentials: true
  },
  allowEIO3: true
})
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {

  constructor(private readonly userSocketService: UserSocketService){}

  @WebSocketServer()
  server: Server;

  handleConnection(@ConnectedSocket() socket: Socket) {
    const name = this.userSocketService.registeruser(socket.id);
    socket.nsp.emit(CHAT_MESSAGE, `[${name}] Welcome`);
    this.userSocketService.consoleUserMap();
  }  
  handleDisconnect(@ConnectedSocket() socket: Socket) {
    const name = this.userSocketService.removeUser(socket.id);
    this.userSocketService.consoleUserMap();
    socket.nsp.emit(CHAT_MESSAGE, ` -- ${name}, has left the chat`);
  }

  @SubscribeMessage(CHAT_MESSAGE)
  async handleMessage(@ConnectedSocket() socket: Socket, @MessageBody() msg: string) {
    let validCommand = false;

    const namesUpdated = this.userSocketService.updateNameCommand(socket.id, msg);
    if( namesUpdated ){
      socket.nsp.emit(CHAT_MESSAGE, `[${namesUpdated.oldName} is hereby known as ${namesUpdated.newName}]`);
      socket.nsp.sockets.get(socket.id).emit(CHAT_MESSAGE, ` -- Updated name successfully to ${namesUpdated.newName}`);
      validCommand = true;
    }

    if( !validCommand ){
      socket.nsp.emit(CHAT_MESSAGE, `[${this.userSocketService.getUserName(socket.id)}] ${msg}`);
    }
  }

  @SubscribeMessage('events')
  findAll(@MessageBody() data: any): Observable<WsResponse<number>> {
    return from([1, 2, 3]).pipe(map(item => ({ event: 'events', data: item })));
  }

  @SubscribeMessage('identity')
  async identity(@MessageBody() data: number): Promise<number> {
    return data;
  }
}
