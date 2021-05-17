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

  return db.collection<User>('users').findOne({
    email: "alu0202@gmail.com",
  });
}).then((result) => {
    console.log(chalk.green("\nUsuario coincidente:\n"))
    console.log(result);
}).catch((error) => {
  console.log(error);
});
