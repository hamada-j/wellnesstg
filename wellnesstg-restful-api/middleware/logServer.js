const fs = require("fs");

const registerAction = (req, res, next) => {
  // Todo
  // fs.appendFileSync(__dirname + `/../fixtures/userActions.log`,
  //   `Method: ${req.method}. Url: ${req.url}. 'Time: ${Date.now()}.\n`   
  // );
  next();
};

module.exports = {
  registerAction: registerAction
};