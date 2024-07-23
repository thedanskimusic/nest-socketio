import { Injectable } from '@nestjs/common';
import { User, UserSocketService } from './user-socker.service';
import { SocketConstants } from '../constants';

const COLOR = SocketConstants.COLOR;

@Injectable()
export class UserPreferenceService {
  constructor(private readonly userSocketService: UserSocketService){}

  getUser(socketId: string): User{
    return this.userSocketService.getUser(socketId)
  }

  private updateColorRegex(msg: string): string | null {
    let parts = /\\update-color \s*(\S+)/.exec(msg);
    if( parts && parts.length > 1 ){
      return parts[1];
    }

    parts = /\\uc \s*(\S+)/.exec(msg);
    if( parts && parts.length > 1 ){
      return parts[1];
    }

    return null
  }

  updateCommand(socketId: string, msg: string): boolean {
    const user = this.getUser(socketId);
    const colorRes = this.updateColorRegex(msg);
    if( !colorRes ) return false;
    switch(colorRes) { 
      case 'blue': { 
         user.preferences.color = COLOR.BLUE
         break;
      }
      case 'green': { 
        user.preferences.color = COLOR.GREEN
        break;
      }
      case 'red': { 
         user.preferences.color = COLOR.RED
         break; 
      } 
      default: { 
         user.preferences.color = COLOR.BLACK
         break; 
      } 
   }
   this.userSocketService.setUser(socketId, user);
   return true;
  }
}