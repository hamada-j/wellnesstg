'use strict';
exports.getAll = async (req, res, next) => {
      res.status(200).json({works: "get fine!"});
};