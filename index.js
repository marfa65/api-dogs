const server = require("./src/app.js");
const { conn } = require("./src/db.js");

// Syncing all the models at once.

function connectionPort (localPort){
  let connection_port;
  if (process.env.DATABASE_URL){
    connection_port = process.env.PORT
  }else{
    connection_port = localPort
  }
  return connection_port
}

conn.sync({ force: false }).then(() => {
  const port = connectionPort(3001) 
  server.listen(port, () => {
    console.log(`%s listening at ${port}`); // eslint-disable-line no-console
  });
});

// server.listen({ port: process.env.PORT || 3001 }).then(({ url }) => {
//   console.log(`Servidor listo en la URL ${url}`);
// });

// const { Client } = require("pg");

// const client = new Client({
//   connectionString: process.env.DATABASE_URL,
//   ssl: {
//     rejectUnauthorized: false,
//   },
// });

// client.connect();

// client.query(
//   "SELECT table_schema,table_name FROM information_schema.tables;",
//   (err, res) => {
//     if (err) throw err;
//     for (let row of res.rows) {
//       console.log(JSON.stringify(row));
//     }
//     client.end();
//   }
// );

// server.listen({ port: process.env.PORT || 3001 }, () => {
//   console.log("%s listening at 3001"); // eslint-disable-line no-console
// });

// test coment