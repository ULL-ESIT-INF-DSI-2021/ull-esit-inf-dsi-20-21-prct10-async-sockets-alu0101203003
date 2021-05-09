import {EventEmitter} from 'events';

/**
 * Clase MessageEventEmitterServer.
 * Permite emitir al servidor la petición del cliente
 * a través de la coneccion establecida.
 * @param connection coneccion establecida
 */
export class MessageEventEmitterServer extends EventEmitter {
    constructor(connection: EventEmitter) {
      super();
  
      let wholeData = '';
      connection.on('data', (dataChunk) => {
        wholeData += dataChunk.toString();
  
        let messageLimit = wholeData.indexOf('\n');
        while (messageLimit !== -1) {
          const message = wholeData.substring(0, messageLimit);
          wholeData = wholeData.substring(messageLimit + 1);
          this.emit('request', JSON.parse(message));
          messageLimit = wholeData.indexOf('\n');
        }
      });
    }
  }