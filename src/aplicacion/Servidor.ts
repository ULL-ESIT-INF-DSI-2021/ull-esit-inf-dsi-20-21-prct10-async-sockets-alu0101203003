import { Usuario } from '../aplicacion/usuario';
const chalk=require('chalk');
import {createServer} from 'net';
import {RequestType, ResponseType} from './tipos';
import { MessageEventEmitterServer } from './MessageEventEmitterServer';

const server = createServer({allowHalfOpen: true}, (connection) => {
  console.log('Cliente conectado');

  var emit = new MessageEventEmitterServer(connection);
  emit.on('request', (mensaje) => {
    console.log('Petición del cliente recibida');

    
    var usuario = new Usuario(mensaje.user);

    var resp :ResponseType = {
      type: 'add',
      success: false,
      mensaje: ""
    }
  
    if (mensaje.type == 'add'){
      var succ = usuario.añadirNota(mensaje.title,mensaje.body,mensaje.color);
      resp = {
        type: 'add',
        success: succ.success,
        mensaje: succ.mensaje
      }
    }

    if (mensaje.type == 'update'){
      var succ = usuario.modificarNota(mensaje.title,mensaje.titleMod,mensaje.bodyMod,mensaje.colorMod);
      resp = {
        type: 'update',
        success: succ.success,
        mensaje: succ.mensaje
      }
    }

    if (mensaje.type == 'remove'){
      var succ = usuario.eliminarNota(mensaje.title);
      resp = {
        type: 'remove',
        success: succ.success,
        mensaje: succ.mensaje
      }
    }

    if (mensaje.type == 'read'){
      var succ = usuario.leerNota(mensaje.title);
      resp = {
        type: 'read',
        success: succ.success,
        mensaje: succ.mensaje
      }
    }

    if (mensaje.type == 'list'){
      var succ = usuario.listarNotas();
      resp = {
        type: 'list',
        success: succ.success,
        mensaje: succ.mensaje
      }
    }

    connection.write(JSON.stringify(resp), (err) => {
      if (err) {
        console.log(chalk.red(`Error. No se pudo realizar la petición: ${err.message}`));
      } else {
        console.log(chalk.green(`Petición del cliente completada correctamente`));
        connection.end();
      }
    });
    
  });


  connection.on('error', (err) => {
    if (err) {
      console.log(chalk.red(`Error.No se pudo establecer conexión: ${err.message}`));
    }
  });

  connection.on('close', () => {
    console.log('Cliente desconectado');
  });
});

  server.listen(60300, () => {
    console.log('Esperando conexión del cliente');
});