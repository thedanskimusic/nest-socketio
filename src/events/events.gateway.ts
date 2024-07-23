import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UserSocketService } from 'src/services/user-socker.service';
import { SocketConstants } from 'src/constants';
import { UserPreferenceService } from 'src/services/user-preference.service';

const MESSAGE_TYPE = SocketConstants.MESSAGE_TYPE;

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

  constructor(
    private readonly userSocketService: UserSocketService,
    private readonly userPreferenceService: UserPreferenceService
  ){}

  @WebSocketServer()
  server: Server;

  handleConnection(@ConnectedSocket() socket: Socket) {
    const name = this.userSocketService.registeruser(socket.id);
    socket.nsp.emit(MESSAGE_TYPE.CHAT_MESSAGE, `[${name}] Welcome`);
    socket.nsp.sockets.get(socket.id).emit(MESSAGE_TYPE.CHAT_MESSAGE,`## Current commands available`);
    socket.nsp.sockets.get(socket.id).emit(MESSAGE_TYPE.CHAT_MESSAGE,`\\update-name [name:string]`);
    socket.nsp.sockets.get(socket.id).emit(MESSAGE_TYPE.CHAT_MESSAGE,`\\update-color [color:string]`);
    this.userSocketService.consoleUserMap();
  }  
  handleDisconnect(@ConnectedSocket() socket: Socket) {
    const name = this.userSocketService.removeUser(socket.id);
    this.userSocketService.consoleUserMap();
    socket.nsp.emit(MESSAGE_TYPE.CHAT_MESSAGE, ` -- ${name}, has left the chat`);
  }

  @SubscribeMessage(MESSAGE_TYPE.CHAT_MESSAGE)
  async handleMessage(@ConnectedSocket() socket: Socket, @MessageBody() msg: string) {
    let validCommand = false;

    const namesUpdated = this.userSocketService.updateNameCommand(socket.id, msg);
    if( namesUpdated ){
      socket.nsp.emit(MESSAGE_TYPE.CHAT_MESSAGE, `[${namesUpdated.oldName} is hereby known as ${namesUpdated.newName}]`);
      socket.nsp.sockets.get(socket.id).emit(MESSAGE_TYPE.CHAT_MESSAGE, ` -- Updated name successfully to ${namesUpdated.newName}`);
      validCommand = true;
    }

    const updatePreference = this.userPreferenceService.updateCommand(socket.id, msg);
    if( updatePreference ){
      socket.nsp.sockets.get(socket.id).emit(MESSAGE_TYPE.CHAT_MESSAGE, ` -- Updated prefences`);
      socket.nsp.sockets.get(socket.id).emit(MESSAGE_TYPE.USER_PREFERENCES, this.userSocketService.getUser(socket.id).preferences);
      validCommand = true;
    }

    if( !validCommand ){
      socket.nsp.emit(MESSAGE_TYPE.CHAT_MESSAGE, `[${this.userSocketService.getUserName(socket.id)}] ${msg}`);
    }
  }
}
