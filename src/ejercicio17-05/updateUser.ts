import {MongoClient} from 'mongodb';
const chalk=require('chalk')

const dbURL = 'mongodb://127.0.0.1:27017';
const dbName = 'users';

interface User {
    nombre: string, 
    apellidos: string, 
    edad: number,
    email: string,
    contraseña: string
}

MongoClient.connect(dbURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then((client) => {
  const db = client.db(dbName);

  return db.collection<User>('users').updateMany({
    email: "alu0202@gmail.com",
  }, {
    $set: {
        nombre: "Raul_Actualizado", 
        apellidos: "Martin", 
        edad: 20,
        email: "alu0202@gmail.com",
        contraseña: "raul123",
    },
  });
}).then((result) => {
    if (result.modifiedCount == 1){
        console.log(chalk.green("\n1 usuario coincidente modificado correctamente\n"))
    } else {
        console.log(chalk.green("\n"+ result.modifiedCount + " usuarios coincidentes modificados correctamente\n"))
    }
}).catch((error) => {
  console.log(error);
});