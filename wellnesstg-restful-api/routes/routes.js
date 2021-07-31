'use strict';
const express = require("express");
const router = express.Router();
const urlController = require("../controllers/controller");
const middleware = require("../middleware/logServer")

router.use(middleware.registerAction);

router.get('/', urlController.getAll);
router.post('/post-csv', urlController.postCSV);
router.post('/post-one', urlController.postOne);
router.put('/edit-one', urlController.editOne);
router.delete('/delete-one/:_id', urlController.deleteOne);


module.exports = router;