'use strict';
const converter = require('json-2-csv');
const mongoose = require("mongoose");
const fs = require('fs');
const customSchema = require('../models/model');
const { generateTime } = require('../utils/util');


exports.getAll = async (req, res, next) => {  
      try {
            const data = await customSchema.find();
            res.status(200).json(data);
      } catch (err) {
            console.log(err);
            res.status(500).json({error: `getAll: ${err}` });
      }     
};

exports.postOne = async (req, res, next) => {
      const createRecord = new customSchema({
            name: req.body.name,
            power: req.body.power,
            consumption: req.body.consumption,
            difference: req.body.difference,
            city: req.body.city,
            bonus: req.body.bonus,
      });           
      try { 
            createRecord.save((err, doc) => {
              if (err) {
                  return res.status(400).json({
                  message: `Can not save this record in database ${err}`
                });
              }
              res.status(200).json(doc)
            })
      } catch (err) {
            console.log(err);
            res.status(500).json({error: `postOne:  ${err}` });
      }     
};

exports.editOne = async (req, res, next) => {
      try { 
            const exitRegister = await customSchema.findOne({ _id: req.body._id});
            if(!exitRegister){
                  res.status(400).json({
                  error: "Can not save this record in database don't has _id, try create new one."});
            } else {
                  customSchema.updateOne({_id:req.body._id}, {$set:req.body}, {upsert: true} ,
                        (err, response) => {
                        if(err) {
                              return res.status(400).json({error:'You are not authorized or wrong data'})
                        }
                        res.status(200).json(response);
                  });                  
            }
      } catch (err) {
            console.log(err);
            res.status(500).json({error: `Edit: ${err}` });
      }     
};

exports.deleteOne = async (req, res, next) => {
      try { 
            const exitRegister = await customSchema.findOne({ _id: req.params._id});
            if(!exitRegister){
                  res.status(400).json({
                  error: `Can not delete this record form database. Db don't has this _id: ${req.params._id}.`});
            } else {
                  await exitRegister.delete().then((response) => {
                        //console.log(response)
                        res.status(200).json(response);
                  }).catch((err) => {console.log(err);
                  return res.status(400).json({error:'You are not authorized or wrong data'})});                  
            }
      } catch (err) {
            console.log(err);
            res.status(500).json({error: `Edit: ${err}`});
      }     
};


exports.postCSV = async (req, res, next) => {
      let fileName = req.body[0];
      let data = req.body[1]    
      let json2csvCallback = function (err, csv) {
       if (err) throw err;
         fs.writeFile(
                  __dirname + `/../fixtures/${generateTime()}_${fileName}`,
                  csv,
                  function (err) {
                        if (err)
                              throw err;                 
                        console.log('CSV ---> .csv saved')
                  }); 
      };      
      try{
            // save the CSV file in Server.   
            converter.json2csv(data, json2csvCallback);  
            // save JSON data in MongoDB
            for (let i = 0; i < data.length; i++){
                        const exitRegister = await customSchema.findOne({ _id: data[i].id });
                        if (!exitRegister) { 
                              const createRegister = new customSchema({
                                    //_id: data[i]._id, 
                                    name: data[i].name,
                                    power: Number(data[i].power),
                                    consumption: Number(data[i].consumption),
                                    difference: Number(data[i].difference),
                                    city: data[i].city,
                                    bonus: JSON.parse(data[i].bonus),
                              });

                              await createRegister.save();
                        }
            } 
            res.status(200).json({msg: `The doc ${fileName} in file are saved in Database correctly.`})      
      }
      catch (err){
            res.status(500).json({ message: `CSV ---> ${err}` });
      }
};

