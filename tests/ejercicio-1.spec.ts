import 'mocha';
import {expect} from 'chai';
import {prueba} from '../src/ejercicio-1/ejercicio-1';

describe('Pruebas funcionamiento tests', ()=> {
  describe('Prueba funcion', ()=> {
    it('expect(prueba()) return prueba', ()=>{
      expect(prueba()).to.be.equal("prueba");
    });
  });
});
