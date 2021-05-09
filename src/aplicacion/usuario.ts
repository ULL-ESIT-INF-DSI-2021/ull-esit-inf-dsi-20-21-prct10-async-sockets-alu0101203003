import * as fs from 'fs';
const chalk=require('chalk');
import {Nota} from './nota';

/**
 * Clase Usuario.
 * Almacena las propiedades de un usuario.
 * Implementa las funciones para manipular las notas de un usuario.
 */
export class Usuario {
    /**
     * Constructor
     * @param nombre del usuario
     */ 
    constructor(private nombre :string) {
        if (!this.existeUsuario(this.nombre)){
            fs.mkdirSync(`src/aplicacion/notas/${this.nombre}`);
        }
    }

    /**
     * Funcion getNombre
     * @returns nombre
     */
    public getNombre(){
        return this.nombre
    }  

    /**
     * Función añadirNota.
     * Permite añadir una nota en el directorio del usuario
     * @param titulo titulo de la nota
     * @param cuerpo cuerpo de la nota
     * @param color color de la nota
     */ 
    public añadirNota(titulo :string, cuerpo :string, color :string){
        var salida = {
            success: false,
            mensaje: ""
        }
        if (this.existeNota(this.nombre,titulo)){
            return salida;
        } else {
            var nota = new Nota(titulo,cuerpo,color);
            var notaFormateada = nota.formatear();
            fs.writeFile(`src/aplicacion/notas/${this.nombre}/${titulo}.json`, notaFormateada, () => {
                salida = {
                    success: true,
                    mensaje: chalk.green('Nota añadida con éxito')
                }
            });
            return salida;
        }
    }

    /**
     * Función modificarNota.
     * Permite cambiar los atributos de una nota del usuario
     * @param titulo titulo actual de la nota
     * @param cuerpo cuerpo actual de la nota
     * @param color color actual de la nota
     */ 
    public modificarNota(titulo :string, tituloMod :string, cuerpoMod :string, colorMod :string){
        var salida = {
            success: false,
            mensaje: ""
        }
        if (!this.existeNota(this.nombre,titulo)){
            return salida;
        } else {
            var nota = fs.readFileSync(`src/aplicacion/notas/${this.nombre}/${titulo}.json`);
            var notaParseada = JSON.parse(nota.toString());
            var notaMod = new Nota(notaParseada.titulo,notaParseada.cuerpo,notaParseada.color);

            if (tituloMod !== ""){
                notaMod.setTitulo(tituloMod);
                fs.renameSync(`src/aplicacion/notas/${this.nombre}/${titulo}.json`, `src/aplicacion/notas/${this.nombre}/${tituloMod}.json`);
            }
            
            if (cuerpoMod !== ""){
                notaMod.setCuerpo(cuerpoMod);
            }

            if (colorMod !== ""){
                notaMod.setColor(colorMod);
            }

            fs.writeFile(`src/aplicacion/notas/${this.nombre}/${notaMod.getTitulo()}.json`, notaMod.formatear(), () => {
                salida = {
                    success: true,
                    mensaje: chalk.green('Nota modificada con éxito')
                }
            });

            return salida;
        }
    }

    /**
     * Función eliminarNota.
     * Permite eliminar una nota en el directorio del usuario
     * @param titulo titulo de la nota
     */ 
    public eliminarNota(titulo :string){
        var salida = {
            success: false,
            mensaje: ""
        }
        if (!this.existeNota(this.nombre,titulo)){
            return salida;
        } else {
            fs.rm(`src/aplicacion/notas/${this.nombre}/${titulo}.json`, () => {
                salida = {
                    success: true,
                    mensaje: chalk.green('Nota eliminada con éxito')
                }
            });
            
            return salida;
        }
    }


    /**
     * Función existeUsuario.
     * Permite comprobar si está creado el directorio del usuario
     * @param nombre del usuario
     */ 
    public existeUsuario (nombre :string){
        if (fs.existsSync(`src/aplicacion/notas/${nombre}`)){
            return true
        } else {
            return false
        }
    }
    
    /**
     * Función existeNota.
     * Permite comprobar si está creada la nota dentro del directorio del usuario
     * @param nombre del usuario
     * @param titulo de la nota
     */ 
    public existeNota (nombre :string, titulo :string){
        if (fs.existsSync(`src/aplicacion/notas/${nombre}/${titulo}.json`)){
            return true
        } else {
            return false
        }
    }

    /**
     * Función listarNotas.
     * Permite mostrar todas las notas del directorio del usuario
     */ 
    public listarNotas(){
        var salida = {
            success: false,
            mensaje: ""
        }
        if (!this.existeUsuario(this.nombre)){
            return salida;
        } else {
            var titulosColoreados :string = `Notas del usuario ${this.nombre} : \n`
            fs.readdirSync(`src/aplicacion/notas/${this.nombre}`).forEach((item) => {
                var nota = fs.readFileSync(`src/aplicacion/notas/${this.nombre}/${item}`);
                var notaParseada = JSON.parse(nota.toString());
                titulosColoreados = titulosColoreados + `\n` + this.colorear(notaParseada.titulo,notaParseada.color);
                
                salida = {
                    success: true,
                    mensaje: titulosColoreados
                }
            });
            return salida;
        }
    }

    /**
     * Función leerNota.
     * Permite leer una nota en el directorio del usuario
     * @param titulo titulo de la nota
     */ 
     public leerNota(titulo :string){
        var salida = {
            success: false,
            mensaje: ""
        }
        if (!this.existeNota(this.nombre,titulo)){
            return salida;
        } else {
            var nota = fs.readFileSync(`src/aplicacion/notas/${this.nombre}/${titulo}.json`);
            var notaParseada = JSON.parse(nota.toString());
            var notaColoreada :string = this.colorear(`Título:\n${notaParseada.titulo}\n\nCuerpo:\n${notaParseada.cuerpo}`,notaParseada.color);
            
            salida = {
                success: true,
                mensaje: notaColoreada
            }
            return salida;
        }
    }
    
    public colorear (texto :string, color :string){
        var resultado = "";
    
        switch (color){
            case "rojo":
                resultado = chalk.red(`${texto}`)
                break;
            case "verde":
                resultado = chalk.green(`${texto}`)
                break;
            case "azul":
                resultado = chalk.blue(`${texto}`)
                break;
            case "amarillo":
                resultado = chalk.yellow(`${texto}`)
                break;
            default:
                break;
        }
    
        return resultado
    }
}
