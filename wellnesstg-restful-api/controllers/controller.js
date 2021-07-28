'use strict';
const converter = require('json-2-csv');
const mongoose = require("mongoose");
const fs = require('fs');
const customSchema = require('../models/model');
const { generateTime } = require('../utils/util');


exports.getAll = async (req, res, next) => {
      
 try {
      const data = await customSchema.find();
      res.status(200).json({data: data})
} catch (err) {
      console.log(err);
      res.status(500).json({error: "getAll: " + err });
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
            for (let i = 0; i < 2; i++){
                
                        const exitRegister = await customSchema.findOne({ id: data[i].id });
                        if (!exitRegister) { 
                              const createRegister = new customSchema({
                                    name: data[i].name,
                                    power: data[i].power,
                                    consumption: data[i].consumption,
                                    difference: data[i].difference,
                                    city: data[i].city,
                                    bonus: data[i].bonus,
                              });
                              await createRegister.save();
                        }

            } 
            res.status(200).json({msg: "saved in mongo"})      
      }
      catch (err){
            res.status(500).json({ message: " " + err });
      }
};

