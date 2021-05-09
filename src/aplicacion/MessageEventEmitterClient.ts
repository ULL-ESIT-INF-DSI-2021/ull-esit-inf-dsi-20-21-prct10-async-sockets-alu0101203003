import {EventEmitter} from 'events';

export class MessageEventEmitterClient extends EventEmitter {
    constructor(connection: EventEmitter) {
      super();
  
        let wholeData = '';
        connection.on('data', (dataChunk) => {
            wholeData += dataChunk; 
        });

        connection.on('end', () => {
            const respuesta = JSON.parse(wholeData);
            this.emit('respuesta', respuesta);
        });
    }
}