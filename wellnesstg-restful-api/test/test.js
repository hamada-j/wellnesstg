'use strict';
const mongoose = require('mongoose');
const supertest = require('supertest');
const csv = require("csvtojson");

const customSchema = require('../models/model');
const app = require('../app');

let arrTest;

// import csv of test
csv().fromFile(__dirname + `/../fixtures/pruebas.csv`).then(function(jsonArrayObj){ 
    arrTest = jsonArrayObj 
});

beforeEach(async (done) => {
  mongoose.connect(
   `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.kvfg8.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`, {
      useUnifiedTopology: true,
      useCreateIndex: true,
      useNewUrlParser: true
},
    () => done(),
  );
  try {
    await customSchema.deleteMany({}, function(err, result) {
      if (err) {
        //console.log(err)
      } else {
        //console.log(result)
      }
    });
      done();
} catch (err) {
    console.log(err);
  }
});

afterEach(async (done) => {
   try {

    await customSchema.deleteMany({}, function(err, result) {
    if (err) {
      //console.log(err)
    } else {
      //console.log(result)
    }
  });
    done();
   }catch (err) {
    console.log(err);
  }
});

afterAll( async done => {
  mongoose.connection.close();
  mongoose.disconnect()
  done();
  console.log("End of Test !!")
});

test('GET / Get all all records in "purebas.csv". Should save 10 elements to database MongoDB Atlas and return them', async () => {
  try{

    for( let i = 0; i < arrTest.length; i++ ) {
      const element = await customSchema.create({
        name: arrTest[i].name,
        power: arrTest[i].power,
        consumption: arrTest[i].consumption,
        difference:  arrTest[i].difference,
        city: arrTest[i].city,
        bonus: arrTest[i].bonus,
      });
    }
    
  await supertest(app)
    .get('/')
    .expect(200)
    .then((response) => {
      expect(Array.isArray(response.body.data)).toBeTruthy();
      expect(response.body.data.length).toEqual(arrTest.length);
      expect(response.body.data[0]._id).not.toEqual(arrTest[0].id);
      expect(response.body.data[1].name).toBe(arrTest[1].name);
      expect(response.body.data[3].power).toBe(Number(arrTest[3].power));
      expect(response.body.data[4].consumption).toBe(Number(arrTest[4].consumption));
      expect(response.body.data[8].difference).toBe(Number(arrTest[8].difference));
      expect(response.body.data[7].city).toBe(arrTest[7].city);
      expect(response.body.data[9].bonus).toBe(JSON.parse(arrTest[9].bonus));
    });
  }catch(err){
    console.log(err);
  } 
});
