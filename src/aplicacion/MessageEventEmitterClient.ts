import {EventEmitter} from 'events';

/**
 * Clase MessageEventEmitterClient.
 * Permite emitir al cliente la respuesta obtenida del servidor
 * a través de la coneccion establecida.
 * @param connection coneccion establecida
 */
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