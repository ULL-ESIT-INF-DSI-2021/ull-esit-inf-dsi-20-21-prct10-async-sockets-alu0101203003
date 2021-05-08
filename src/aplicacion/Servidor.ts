import * as yargs from 'yargs';
import { Usuario } from '../aplicacion/usuario';
const chalk=require('chalk');
import {EventEmitter} from 'events';
import * as net from 'net';
import {createServer} from 'net';
import {spawn} from 'child_process';
import {connect} from 'net';
import {RequestType, ResponseType} from './tipos';

const server = createServer({allowHalfOpen: true}, (connection) => {
  console.log('Client connected');

  let data = '';
  connection.on('data', (chunk) => {
    data += chunk;
  });

  connection.on('end', () => {
    console.log('Request received from client');

    const request = JSON.parse(data);
    var usuario = new Usuario(request.user);

    if (request.type == 'add'){
      usuario.añadirNota(request.title,request.body,request.color);
      connection.end();
    }

    if (request.type == 'update'){
      usuario.modificarNota(request.title,request.titleMod,request.bodyMod,request.colorMod);
      connection.end();
    }

    if (request.type == 'remove'){
      usuario.eliminarNota(request.title);
      connection.end();
    }
  });
    /*
    const cmd = spawn(request.command, request.arguments);

    let cmdOutput = '';
    cmd.stdout.on('data', (chunk) => {
      cmdOutput += chunk;
    });

    let cmdError = '';
    cmd.stderr.on('data', (chunk) => {
      cmdError += chunk;
    });

    cmd.on('close', (code) => {
      let response: ResponseType;
      if (code! < 0) {
        response = {
          error: `Command ${request.command} does not exist`,
        };
      } else if (code! > 0) {
        response = {
          error: cmdError,
        };
      } else {
        response = {
          output: cmdOutput,
        };
      }
      console.log('Response sent to client');
      connection.write(JSON.stringify(response), (err) => {
        if (err) {
          console.log(`Response could not be sent back: ${err.message}`);
        } else {
          connection.end();
        }
      });
    });

    cmd.on('error', (err) => {
      if (err) {
        console.log(`Command could not be run: ${err.message}`);
      }
    });
  */

  connection.on('error', (err) => {
    if (err) {
      console.log(`Connection could not be established: ${err.message}`);
    }
  });

  connection.on('close', () => {
    console.log('Client disconnected');
  });
});

  server.listen(60300, () => {
    console.log('Waiting for clients to connect');
});