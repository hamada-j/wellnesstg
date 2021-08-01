'use strict';
const mongoose = require('mongoose');
const supertest = require('supertest');
const csv = require("csvtojson");

const customSchema = require('../models/testModel');
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
      useNewUrlParser: true,
      useFindAndModify: false
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

test('GET /getAll all records in "purebas.csv" file for test pass them form CSV to JSON. Should save 10 elements to database MongoDB Atlas and return them', async () => {
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
      expect(Array.isArray(response.body)).toBeTruthy();
      expect(response.body.length).toEqual(arrTest.length);
      expect(response.body[0]._id).not.toEqual(arrTest[0].id);
      expect(response.body[1].name).toBe(arrTest[1].name);
      expect(response.body[3].power).toBe(Number(arrTest[3].power));
      expect(response.body[4].consumption).toBe(Number(arrTest[4].consumption));
      expect(response.body[8].difference).toBe(Number(arrTest[8].difference));
      expect(response.body[7].city).toBe(arrTest[7].city);
      expect(response.body[9].bonus).toBe(JSON.parse(arrTest[9].bonus));
    });
  }catch(err){
    console.log(err);
  } 
});



test('POST /post-one, Should post one element in database givin the correct data for the model and Mongoose _id and create time', 
  async () => {
    try{
      const data = {
          name: 'High-Tech',
          power: 4,
          consumption: 2,
          difference: 2,
          city: 'Madrid',
          bonus: true
      }

    await supertest(app)
      .post('/post-one')
      .send(data)
      .expect(200)
      .then(async (response) => {
        //the data in the response
        expect(response.body.name).toBe(data.name);
        expect(response.body.power).toBe(data.power);
        //the data in the database
        const result = await customSchema.findOne({ _id: response.body._id });
        expect(result).toBeTruthy();
        expect(result.consumption).toBe(data.consumption);
        expect(result.city).toBe(data.city);
        expect(result.bonus).toBe(data.bonus);
      });
    }catch(err){
      console.log(err);
    }
});



test('PUT /edit-one, Should post one element fom de CSV in database and edited it with new data', 
  async () => {
    try{
      let _idDoc ;
      const beforeInsertRecord = {
        name: arrTest[0].name,
        power: arrTest[0].power,
        consumption: arrTest[0].consumption,
        difference: arrTest[0].difference,
        city: arrTest[0].city,
        bonus: arrTest[0].bonus,
      }
      await customSchema.create(beforeInsertRecord)
        .then(res => {_idDoc = res._id;})
        .catch(err => console.error(err));

      const afterInsertRecord = {
      _id: _idDoc,
      name: 'Tomas',
      power: 100,
      consumption: 90,
      difference: 10,
      city: 'Barcelona',
      bonus: true
    }
    await supertest(app)
      .put('/edit-one')
      .send(afterInsertRecord)
      .expect(200)
      .then(async (response) => {
        const resultUpdate = await customSchema.findOne({_id: _idDoc});
        //the response of update
        expect(response.body).toBeTruthy();
        expect(response.body.n).toBe(1);
        expect(response.body.nModified).toBe(1);
        expect(response.body.ok).toBe(1);
        //the data in database
        expect(resultUpdate).toBeTruthy();
        expect(resultUpdate.name).toBe(afterInsertRecord.name);
        expect(resultUpdate.power).toBe(afterInsertRecord.power);
        expect(resultUpdate.consumption).toBe(afterInsertRecord.consumption);
        expect(resultUpdate.city).toBe(afterInsertRecord.city);
        expect(resultUpdate.bonus).toBe(afterInsertRecord.bonus);
      });
    }catch(err){
      console.log(err);
    }
});

test('DELETE /delete-one, Should post one element fom de CSV in database and delete it', 
  async () => {
    try{
      let _idDoc ;
      let afterInsertRecord;
      const beforeInsertRecord = {
        name: arrTest[0].name,
        power: arrTest[0].power,
        consumption: arrTest[0].consumption,
        difference: arrTest[0].difference,
        city: arrTest[0].city,
        bonus: arrTest[0].bonus,
      }
    
      await customSchema.create(beforeInsertRecord)
        .then(res => {_idDoc = res._id; afterInsertRecord = res;})
        .catch(err => console.error(err));
      const dataBeforeDelete = await customSchema.find();

     await supertest(app)
      .delete(`/delete-one/${_idDoc}`)
      .send()
      .expect(200)
      .then(async (response) => {
        //the response of delete
        expect(response.body).toBeTruthy();
        expect(response.body._id).toBe(afterInsertRecord._id.toString());
        expect(response.body.power).toBe(afterInsertRecord.power);
        expect(response.body.consumption).toBe(afterInsertRecord.consumption);
        expect(response.body.difference).toBe(afterInsertRecord.difference);
        expect(response.body.city).toBe(afterInsertRecord.city);
        expect(response.body.bonus).toBe(afterInsertRecord.bonus);
        //the data in database
        const dataAfterDelete = await customSchema.find();
        expect(Array.isArray(dataAfterDelete)).toBeTruthy();
        expect(dataAfterDelete.length).toEqual(0);
        expect(dataAfterDelete).not.toBe(dataBeforeDelete);
      });
    }catch(err){
      console.log(err);
    }
});

