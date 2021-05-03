import * as net from 'net';
import {spawn} from 'child_process';
import * as yargs from 'yargs';
const chalk=require('chalk')
import * as fs from 'fs';

/**
 * Socket cliente.
 * Representa la conexión del cliente al servidor que enviará el comando a ejecutar
 * y recibirá la respuesta a ese comando
 */
function cliente(comando :string){
    const client = net.connect({port: 60300});
    console.log(`Enviando comando ${comando}`);
    client.write(JSON.stringify({'tipo': 'comando', 'descripccion': `Ejecuta el comando "${comando}"`, 'comando': `${comando}`}) +'\n');
    client.end();
    let wholeData = '';
    client.on('data', (dataChunk) => {
        wholeData += dataChunk;
    });

    client.on('end', () => {
        const message = JSON.parse(wholeData);

        if (message.tipo === 'ejecucion') {
            console.log(`El comando muestra la siguiente salida:\n${message.salida}`);
        } else {
            console.log(`Message type ${message.tipo} is not valid`);
        }
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
      comando: {
        describe: 'Comando a ejecutar por el servidor',
        demandOption: true,
        type: 'string',
      },
    },
    handler(argv) {
      if (typeof argv.comando === 'string') {
        cliente(argv.comando);
  
      } else {
        console.log(chalk.red("Error. Comando mal especificado"));
      }
    },
  });

  yargs.argv;