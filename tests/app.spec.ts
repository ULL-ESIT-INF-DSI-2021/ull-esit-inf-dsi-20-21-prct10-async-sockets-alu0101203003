import 'mocha';
import {expect} from 'chai';
import {Nota} from '../src/aplicacion/nota';
import {Usuario} from '../src/aplicacion/usuario';
const chalk=require('chalk');
import {EventEmitter} from 'events';
import {MessageEventEmitterClient} from '../src/aplicacion/MessageEventEmitterClient';
import {MessageEventEmitterServer} from '../src/aplicacion/MessageEventEmitterServer';

describe('Pruebas App', () => {
  

  describe('Pruebas Nota', () => {
    
    var nota1 = new Nota("Nota1","Cuerpo","rojo")

    it('nota1.getTitulo() returns "Nota1"', () => {
      expect(nota1.getTitulo()).to.be.equal("Nota1");
    });
   
    it('nota1.getCuerpo() returns "Cuerpo"', () => {
      expect(nota1.getCuerpo()).to.be.equal("Cuerpo");
    });

    it('nota1.getColor() returns "rojo"', () => {
      expect(nota1.getColor()).to.be.equal("rojo");
    });

    it('nota1.formatear() returns not null', () => {
        expect(nota1.formatear()).not.to.be.equal(null);
    });

  });

  describe('Pruebas Usuario', () => {

    var usuario1 = new Usuario("raul");
    usuario1.añadirNota("NotaPrueba","Cuerpo","amarillo");

    it('usuario1.getNombre() returns raul', () => {
      expect(usuario1.getNombre()).to.be.equal("raul");
    });

    it('usuario1.existeUsuario(usuario1.getNombre()) returns true', () => {
        expect(usuario1.existeUsuario(usuario1.getNombre())).to.be.equal(true);
    });

    it('usuario1.añadirNota("Nota1","Cuerpo","rojo") returns not null', () => {
        expect(usuario1.añadirNota("Nota1","Cuerpo","rojo")).not.to.be.equal(null);
    });

    it('usuario1.modificarNota("Nota1","","Cuerpo2","rojo") returns not null', () => {
        expect(usuario1.modificarNota("Nota1","","Cuerpo2","verde")).not.to.be.equal(null);
    });

    it('usuario1.existeNota(usuario1.getNombre(),"NotaPrueba")) returns true', () => {
        expect(usuario1.existeNota(usuario1.getNombre(),"NotaPrueba")).to.be.equal(true);
    });

    it('usuario1.colorear("texto","rojo") returns red texto', () => {
        expect(usuario1.colorear("texto","rojo")).to.be.equal(chalk.red("texto"));
    });

    it('usuario1.listarNotas() returns not null', () => {
        expect(usuario1.listarNotas()).not.to.be.equal(null);
    });

    it('usuario1.leerNota("Nota1") returns not null', () => {
        expect(usuario1.leerNota("Nota1")).not.to.be.equal(null);
    });

    /* 
    //La función rm que usa elminiarNota no está disponible en las versiones 10 y 12 de Node.js
    it('usuario1.eliminarNota("Nota1") returns not null', () => {
        expect(usuario1.eliminarNota("Nota1")).not.to.be.equal(null);
    });
    */

    
  });

  describe('Pruebas MessageEventEmitterClient', () => {

    it('', ()=>{
        
      });

  });

});

/* 
Las pruebas que manipulan las notas (al hacer uso del sistema de ficheros) solo se podrán ejecutar una vez, 
para la siguiente será necesario borrar el directorio "raul" dentro de notas.
*/