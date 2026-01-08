
class SimpleEventEmitter {
  constructor() {
    this.events = {};
  }

  on(event, listener) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(listener);
    return this;
  }

  off(event, listener) {
    if (!this.events[event]) return this;
    this.events[event] = this.events[event].filter(l => l !== listener);
    return this;
  }

  emit(event, ...args) {
    if (!this.events[event]) return false;
    this.events[event].forEach(listener => listener(...args));
    return true;
  }
}

class MockSocket extends SimpleEventEmitter {
  constructor() {
    super();
    this.connected = false;
    this.rooms = [
      { id: '1', name: 'General' },
      { id: '2', name: 'React Developers' },
      { id: '3', name: 'Random' },
    ];
  }

  connect() {
    this.connected = true;
    setTimeout(() => {
      this.emit('connect');
    }, 100);
    return this;
  }

  disconnect() {
    this.connected = false;
    this.emit('disconnect');
    return this;
  }

  emit(event, data) {
    // Override emit to handle outgoing events simulation, while super.emit handles local listeners

    // If we want to simulate server listening to our events:
    console.log(`[MockSocket] Emitted to server: ${event}`, data);

    if (event === 'join_room') {
      const room = this.rooms.find(r => r.id === data);
      if (room) {
        setTimeout(() => {
          // Simulate receiving previous messages or a welcome message
          // We use super.emit to trigger the 'message' listener on the client
          super.emit('message', {
            id: Math.random().toString(36).substr(2, 9),
            user: 'System',
            text: `Welcome to ${room.name}!`,
            timestamp: new Date().toISOString()
          });
        }, 500);
      }
    } else if (event === 'send_message') {
      // Echo the message back to the room (and theoretically others)
      setTimeout(() => {
        super.emit('message', {
          id: Math.random().toString(36).substr(2, 9),
          user: data.user,
          text: data.text,
          timestamp: new Date().toISOString()
        });
      }, 100);

      // Simulate a reply from another user sometimes
      if (Math.random() > 0.5) {
        setTimeout(() => {
          super.emit('message', {
            id: Math.random().toString(36).substr(2, 9),
            user: 'Bot_User',
            text: `Interesting point, ${data.user}!`,
            timestamp: new Date().toISOString()
          });
        }, 2000);
      }
    } else if (event === 'get_rooms') {
      setTimeout(() => {
        super.emit('rooms_list', this.rooms);
      }, 100);
    }
  }
}

const socket = new MockSocket();
export default socket;
