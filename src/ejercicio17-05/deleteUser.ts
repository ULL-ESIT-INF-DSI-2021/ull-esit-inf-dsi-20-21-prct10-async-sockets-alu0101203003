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

  return db.collection<User>('users').deleteMany({
    email: "alu0202@gmail.com",
  });
}).then((result) => {
    if (result.deletedCount == 1){
        console.log(chalk.green("\n1 usuario coincidente borrado correctamente\n"))
    } else {
        console.log(chalk.green("\n"+ result.deletedCount + " usuarios coincidentes borrados correctamente\n"))
    }
  console.log(result.deletedCount);
}).catch((error) => {
  console.log(error);
});