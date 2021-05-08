import * as yargs from 'yargs';
import { Usuario } from '../aplicacion/usuario';
const chalk=require('chalk');
import {EventEmitter} from 'events';
import * as net from 'net';
import {createServer} from 'net';
import {spawn} from 'child_process';
import {connect} from 'net';
import {RequestType, ResponseType} from './tipos';


const client = connect({port: 60300});

let data = '';
client.on('data', (chunk) => {
  data += chunk;
}); 

  
/*
  client.on('end', () => {
    const res: ResponseType = JSON.parse(data);
    if (res.error) {
      console.log(res.error);
    } else if (res.output) {
      console.log(res.output);
    }
  });

  client.on('error', (err) => {
    console.log(`Connection could not be established: ${err.message}`);
  });
*/

/**
 * Comando add.
 * Añade una nota al directorio del usuario
 */
 yargs.command({
  command: 'add',
  describe: 'Añade una nueva nota',
  builder: {
    usuario: {
      describe: 'Nombre del usuario',
      demandOption: true,
      type: 'string',
    },
    titulo: {
      describe: 'Titulo de la nota',
      demandOption: true,
      type: 'string',
    },
    cuerpo: {
      describe: 'Cuerpo de la nota',
      demandOption: true,
      type: 'string',
    },
    color: {
      describe: 'Color de la nota',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.usuario === 'string' && typeof argv.titulo === 'string' && typeof argv.cuerpo === 'string' && typeof argv.color === 'string') {
      
      const req: RequestType = {
        type: 'add',
        user: argv.usuario,
        title: argv.titulo,
        body: argv.cuerpo,
        color: argv.color,
      };
      
      client.write(JSON.stringify(req), (err) => {
        if (err) {
          console.log(`Error. No se pudo hacer la peticion al servidor: ${err.message}`);
        } else {
          client.end();
        }
      });

    } else {
      console.log(chalk.red("Error. Comando mal especificado"));
    }
  },
});

/**
 * Comando modify.
 * Modifica una nota al directorio del usuario
 */
 yargs.command({
  command: 'modify',
  describe: 'Modifica una nota',
  builder: {
    usuario: {
      describe: 'Nombre del usuario',
      demandOption: true,
      type: 'string',
    },
    titulo: {
      describe: 'Titulo de la nota',
      demandOption: true,
      type: 'string',
    },
    tituloMod: {
      describe: 'Titulo nuevo de la nota',
      demandOption: true,
      type: 'string',
    },
    cuerpoMod: {
      describe: 'Cuerpo nuevo de la nota',
      demandOption: true,
      type: 'string',
    },
    colorMod: {
      describe: 'Color nuevo de la nota',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.usuario === 'string' && typeof argv.titulo === 'string' && typeof argv.tituloMod === 'string'&& typeof argv.cuerpoMod === 'string' && typeof argv.colorMod === 'string') {
      
      const req: RequestType = {
        type: 'update',
        user: argv.usuario,
        title: argv.titulo,
        titleMod: argv.tituloMod,
        bodyMod: argv.cuerpoMod,
        colorMod: argv.colorMod,
      };
      
      client.write(JSON.stringify(req), (err) => {
        if (err) {
          console.log(`Error. No se pudo hacer la peticion al servidor: ${err.message}`);
        } else {
          client.end();
        }
      });
      
    } else {
      console.log(chalk.red("Error. Comando mal especificado"));
    }
  },
});

/**
 * Comando remove.
 * Elimina una nota al directorio del usuario
 */
 yargs.command({
  command: 'remove',
  describe: 'elimina una nota',
  builder: {
    usuario: {
      describe: 'Nombre del usuario',
      demandOption: true,
      type: 'string',
    },
    titulo: {
      describe: 'Titulo de la nota',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.usuario === 'string' && typeof argv.titulo === 'string') {
      
      const req: RequestType = {
        type: 'remove',
        user: argv.usuario,
        title: argv.titulo
      };
      
      client.write(JSON.stringify(req), (err) => {
        if (err) {
          console.log(`Error. No se pudo hacer la peticion al servidor: ${err.message}`);
        } else {
          client.end();
        }
      });
      
    } else {
      console.log(chalk.red("Error. Comando mal especificado"));
    }
  },
});

/**
 * Comando read.
 * Lee una nota al directorio del usuario
 */
 yargs.command({
  command: 'read',
  describe: 'lee una nota',
  builder: {
    usuario: {
      describe: 'Nombre del usuario',
      demandOption: true,
      type: 'string',
    },
    titulo: {
      describe: 'Titulo de la nota',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.usuario === 'string' && typeof argv.titulo === 'string') {
      
      const req: RequestType = {
        type: 'read',
        user: argv.usuario,
        title: argv.titulo
      };
      
      client.write(JSON.stringify(req), (err) => {
        if (err) {
          console.log(`Error. No se pudo hacer la peticion al servidor: ${err.message}`);
        } else {
          client.end();
        }
      });
      
    } else {
      console.log(chalk.red("Error. Comando mal especificado"));
    }
  },
});

/**
 * Comando list.
 * Lista las notas del directorio del usuario
 */
 yargs.command({
  command: 'list',
  describe: 'lista las notas del usuario',
  builder: {
    usuario: {
      describe: 'Nombre del usuario',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.usuario === 'string') {
      
      const req: RequestType = {
        type: 'list',
        user: argv.usuario,
      };
      
      client.write(JSON.stringify(req), (err) => {
        if (err) {
          console.log(`Error. No se pudo hacer la peticion al servidor: ${err.message}`);
        } else {
          client.end();
        }
      });
      
    } else {
      console.log(chalk.red("Error. Comando mal especificado"));
    }
  },
});

yargs.argv;