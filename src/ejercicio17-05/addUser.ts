//ej 17-05: 
import {MongoClient} from 'mongodb';

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

  return db.collection<User>('users').insertOne({
    nombre: "Raul2", 
    apellidos: "Martin2", 
    edad: 20,
    email: "alu0202@gmail.com",
    contraseña: "raul123",
  });
}).then((result) => {
  console.log(result);
}).catch((error) => {
  console.log(error);
});
