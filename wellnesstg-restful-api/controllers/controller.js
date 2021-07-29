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
      res.status(500).json({error: "getAll: " + err });
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
                  message: "Can not save this record in database" + err
                });
              }
              res.status(200).json(doc)
            })
      } catch (err) {
            console.log(err);
            res.status(500).json({error: "postOne: " + err });
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
                        console.log('.csv saved')
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

            res.status(200).json({msg: "The records in file are saved in Database correctly."})      
      }
      catch (err){
            res.status(500).json({ message: "-----> " + err });
      }
};

