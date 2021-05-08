import {EventEmitter} from 'events';
import * as net from 'net';

export class EventEmitterServer extends EventEmitter {
    private server: net.Server;
  
    constructor() {
      super();
    }
}