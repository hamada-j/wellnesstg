'use strict';
const express = require("express");
const router = express.Router();
const urlController = require("../controllers/controller");

router.get('/', urlController.getAll);
router.post('/post-csv', urlController.postCSV);
router.post('/post-one', urlController.postOne);


module.exports = router;