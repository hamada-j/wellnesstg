'use strict';
const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const cors = require("cors");
const morgan = require('morgan')
require('dotenv').config();
require("./db/mongoDB");

const {MongoClient} = require('mongodb');
const uri = "mongodb+srv://wellnesstgUser:JtGK2Fyz6JGTMVGE@cluster0.kvfg8.mongodb.net/sample_mflix?retryWrites=true&w=majority";

/** ==========================================
 
                  ROUTING
 
==========================================**/
const apiRouter = require("./routes/routes");
/** ==========================================
 
                  APP
 
==========================================**/
const app = express();
/** ==========================================
 
                  Logs
 
==========================================**/
app.use(morgan('combined'))
/** ==========================================
 
                  Data Base
 
==========================================**/
mongoose.Promise = global.Promise;

/** ==========================================**/
app.use(express.urlencoded({ extended: false }));
/** ==========================================
              HEADERS --- CORS      
          
==========================================**/
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authoritation"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT,PATCH, DELETE");
    return res.status(200).json({});
  }
  next();
});
/** ==========================================**/
app.use("/", apiRouter);
/** ==========================================**/

module.exports = app;