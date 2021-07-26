'use strict';
const mongoose = require("mongoose");
mongoose.connect(
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.kvfg8.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`, {
      useUnifiedTopology: true,
      useCreateIndex: true,
      useNewUrlParser: true
}).then(() => {
  console.log("Connect to MongoDB-Atlas");
}).catch(() => {
  console.log("DesConnect from MongoDB-Atlas");
});;


// const {MongoClient} = require('mongodb');
// const uri = ``;
// const client = new MongoClient(uri, {
//       useUnifiedTopology: true,
//       useCreateIndex: true,
//       useNewUrlParser: true
// });
// async function main(){
//     try {
//         await client.connect();
//         await  listDatabases(client);
//     } catch (e) {
//         console.error(e);
//     } finally {
//         await client.close();
//     }
// }
// main().catch(console.error);

