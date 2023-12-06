const { v4: uuidv4 } = require("uuid");
const socketIo = require("socket.io");

const ROOM_MAX_CAPACITY = 6;

/**
 * roomState = [{id: roomid}, users: number]
 */

class Room {
  constructor() {
    this.roomsState = [];
  }

  joinRoom() {
    return new Promise((resolve) => {
      for (let i = 0; i < this.roomsState.length; i++) {
        if (this.roomsState[i].users < ROOM_MAX_CAPACITY) {
          this.roomsState[i].users++;
          return resolve(this.roomsState[i].id);
        }
      }

      // else generate a new room id  
      const newID = uuidv4();
      this.roomsState.push({
        id: newID,
        users: 1,
        usernames: [] // Initialize an array to store usernames in each room
      });
      return resolve(newID);
    });
  }

  leaveRoom(id) {
    this.roomsState = this.roomsState.filter((room) => {
      if (room.id === id) {
        if (room.users === 1) {
          return false;
        } else {
          room.users--;
        }
      }
      return true;
    });
  }

  getUsernames(roomID) {
    const room = this.roomsState.find((room) => room.id === roomID);
    if (room) {
      return room.usernames;
  } else {
      return [];
  }
  }

  addUserToRoom(roomID, username) {
    const room = this.roomsState.find((room) => room.id === roomID);
    if (room) {
      room.usernames.push(username);
    }
  }

  removeUserFromRoom(roomID, username) {
    const room = this.roomsState.find((room) => room.id === roomID);
    if (room) {
      room.usernames = room.usernames.filter((name) => name !== username);
    }
  }
}

module.exports = Room;