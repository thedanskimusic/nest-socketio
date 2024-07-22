import { Injectable } from '@nestjs/common';
import { faker } from '@faker-js/faker';

export type User  = {
  name: string;
  socketId: string;
}

export type NamePair = {
  oldName: string;
  newName: string;
}

type SocketId = string;

@Injectable()
export class UserSocketService {
  private users: Map<SocketId, User> = new Map();
  getUserName(socketId: string): string {
    try{
      return this.users.get(socketId).name;
    }catch(err: unknown){
      console.error(`SocketID not found in users map(): ${socketId}`)
    }
  }

  private updateUserName(socketId: string, name: string): NamePair {
    const oldName = this.getUserName(socketId);
    const updatedUser = {
      socketId,
      name
    }
    this.users.set(socketId, updatedUser);
    const newName = this.getUserName(socketId);
    return {
      oldName,
      newName
    }
  }

  private updateNameRegex(msg: string): string | null {
    let parts = /\\update-name \s*(\S+)/.exec(msg);
    if( parts && parts.length > 1 ){
      return parts[1];
    }

    parts = /\\un \s*(\S+)/.exec(msg);
    if( parts && parts.length > 1 ){
      return parts[1];
    }

    return null
  }

  updateNameCommand(socketId: string, msg: string): NamePair | null {
    const nameRes = this.updateNameRegex(msg);
    if( nameRes ){
      const names = this.updateUserName(socketId, nameRes)
      return names
    }
    return null
  }

  registeruser(socketId: string): string {
    const firstname = faker.person.firstName();
    const user: User = {
      socketId: socketId,
      name: firstname
    }
    this.users.set(socketId, user);
    return firstname;
  }

  removeUser(socketId: string): string {
    const name = this.getUserName(socketId);
    this.users.delete(socketId);
    return name;
  }

  consoleUserMap(): void {
    console.log({'====> Users Connected': this.users.size})
    this.users.forEach((user: User)=>{
      console.log(user.name, user.socketId);
    })
  }
}