import * as net from 'net';
import {spawn} from 'child_process';
import * as yargs from 'yargs';
const chalk=require('chalk')
import * as fs from 'fs';

/**
 * Socket servidor.
 * Representa la conexión del servidor que recibirá el comando solicitado por el cliente y le
 * enviará la respuesta
 */
function servidor(){
    const server = net.createServer({allowHalfOpen:true},(connection) => {
        console.log('El cliente se ha conectado.');

        //connection.write(`Conexión establecida.`);
        
        /*
        Todo lo debe hacer dentro de un on end. Se debe manejar tambien el child process para enviar on close (no solo
        el on data porque si no no se hace completo).
        El on data solo sirve para coger el mensaje a cachitos.
        */
        connection.on('data', (dataJSON) => {
            const message = JSON.parse(dataJSON.toString());
            if (message.tipo == "comando") {
                console.log(`Mensaje recibido: ${message.descripccion}.\nComando: ${message.comando}`)
            }

            var child = spawn(`${message.comando}`, {
                shell: true
            });

            child.stdout.on('data', function (data) {
                var salidaComando = data.toString();
                connection.write(JSON.stringify({'tipo': 'ejecucion', 'salida': salidaComando}) +'\n');
                connection.end();
            });
        });

        connection.on('close', () => {
            console.log('El cliente se ha desconectado.');
        });


    }).listen(60300, () => {
    console.log('Waiting for clients to connect.');
    });
}

/**
 * Comando connect
 * Permite la conexión con el otro socket.
 */
 yargs.command({
    command: 'connect',
    describe: 'Permite la conexión con el otro socket',
    builder: {
    },
    handler(argv) {
        servidor();
    },
  });

  yargs.argv;