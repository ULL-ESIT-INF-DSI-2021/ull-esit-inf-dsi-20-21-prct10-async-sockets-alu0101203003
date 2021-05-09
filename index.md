# Práctica 10: implementación de un cliente y un servidor de la aplicación de procesamiento de notas mediante Sockets en Node.js. Informe.
## Desarrollo de Sistemas Informáticos 
## Raúl Martín Rigor - alu0101203003@ull.edu.es

### Introducción

En este informe se resumen las actividades realizadas en la **práctica 10** para poner en práctica nuestros conocimientos de TypeScript sobre Sockets para trabajar en la manipulación de peticiones,respuestas y conexiones entre un cliente y un servidor... a través de la implementación de la aplicación de notas previamente desarrollada en la práctica 8. En esta práctica tambien haremos uso de los principios SOLID en la medida de lo posible.

### Objetivos

Al finalizar la práctica, habremos completado los siguientes objetivos:

* Saber establecer correctamente una conexión servidor-cliente mediante sockets.
* Hacer uso de peticiones y respuestas entre las dos partes de la conexión.
* Desarrollar una aplicación funcional utilizable desde el cliente que, a través del servidor, ejecute las funciones necesarias para cumplir con las posibilidades de la aplicacion de notas.

### 1. Creación y configuración del driectorio del proyecto.

#### 1.1. Estructura inicial

Para la creación de la estructura inicial, seguiremos los mismos pasos que en practicas anteriores ([práctica 4](https://github.com/ULL-ESIT-INF-DSI-2021/ull-esit-inf-dsi-20-21-prct04-arrays-tuples-enums-alu0101203003/blob/gh-pages/index.md)).

La estructura debería quedar similar a las siguientes fotos:

<img src="img/Captura1a.PNG" alt="" height="250"/> <img src="img/Captura1b.PNG" alt="" /> <img src="img/Captura1c.PNG" alt="" />

#### 1.2. Organización de los ficheros

Será necesario implementar las clases, servidor y cliente en ficheros diferentes. 
Los ficheros que dependan de otros (o de otros paquetes) requeriran de un `import` del recurso que necesiten:

<img src="img/Captura1d.PNG" alt="" width="250"/> <img src="img/Captura1e.PNG" alt="" />

#### 1.3. Testing y cubrimiento de código

Se usarán distintas herramientas (a través de GitHub Actions) para tener constancia de los resultados de las pruebas y del cubrimiento de código. Serán instaladas con la ayuda de sus respectivos tutoriales ([Tests de Node.js](https://drive.google.com/file/d/1hwtPovQlGvthaE7e7yYshC4v8rOtLSw0/view), [Coveralls](https://drive.google.com/file/d/1hwtPovQlGvthaE7e7yYshC4v8rOtLSw0/viewhttps://drive.google.com/file/d/1yOonmpVbOyvzx3ZbXMQTAPxvA3a7AE7w/view) y [SonarCloud](https://drive.google.com/file/d/1FLPargdPBX6JaJ_85jNsRzxe34sMi-Z3/view)).

### 2. Ejercicio

Paso a explicar la resolución del ejercicio y a adjuntar su código. Se mostrará una versión simplificada del enunciado del ejercicio (para verlo al completo con aclaraciones y pistas, consultar la [guía de la práctica](https://ull-esit-inf-dsi-2021.github.io/prct09-async-fs-process/).

Para poder resolver este ejercicio nos serán de utilidad ciertas herramientas de los paquetes [yargs](https://www.npmjs.com/package/yargs) y [chalk](https://www.npmjs.com/package/chalk), los cuales debemos instalar con sus correspondientes dependencias para el manejo de comandos y el color del texto. También será de vital importancia instalar el paquete `@types/node` para utilizar las APIs de [Node.js](https://nodejs.org/en/).

Todos los manejadores de comandos, métodos auxiliares... se pueden comprobar en el [código fuente de la práctica](https://ull-esit-inf-dsi-2021.github.io/prct10-async-sockets/) con el fin de no saturar este informe.

**Enunciado:**

Para este ejercicio se nos solicitan las mimas funcionalidades que en el ejercicio de la [práctica 8](https://ull-esit-inf-dsi-2021.github.io/prct08-filesystem-notes-app/). Las novedades (al tratarse de sockets) son las siguientes:

El servidor es responsable de hacer persistente la lista de notas de cada usuario:

* Guardar cada nota de la lista en un fichero con formato JSON. Los ficheros JSON correspondientes a las notas de un usuario concreto deberán almacenarse en un directorio con el nombre de dicho usuario.
* Cargar una nota desde los diferentes ficheros con formato JSON almacenados en el directorio del usuario correspondiente.

Un usuario solo puede interactuar con la aplicación de procesamiento de notas de texto a través de la línea de comandos del cliente. Los diferentes comandos, opciones de los mismos, así como manejadores asociados a cada uno de ellos deben gestionarse mediante el uso del paquete yargs.

#### 2.1 Cliente

#### 2.2 Servidor

#### 2.2 Servidor

### Conclusiones

Con esta práctica he aprendido a manejar los sockets y, con ello, conectar eficazmente un cliente con un servidor. Este tipo de conexiones ocurren el muchísimos programas que requieren la interacción remota. Esta herramienta me será muy útil para cualquiera de mis actuales y siguientes desarrollos.

### Bibliografía

A continuación se muestra una serie de recursos que han sido de gran utilidad para la realización de la práctica y de este informe:

Recurso| Dirección
-------|----------
Guía de la práctica | https://ull-esit-inf-dsi-2021.github.io/prct10-async-sockets/
Apuntes | https://ull-esit-inf-dsi-2021.github.io/nodejs-theory/
Sockets | https://ull-esit-inf-dsi-2021.github.io/nodejs-theory/nodejs-sockets.html

