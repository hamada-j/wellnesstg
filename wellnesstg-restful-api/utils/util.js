const generateTime = function() {
    let ts = Date.now();
    let date_ob = new Date(ts);
    let date = date_ob.getDate();
    let month = date_ob.getMonth() + 1;
    let year = date_ob.getFullYear();
    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes();
    let seconds = date_ob.getSeconds();

  let time  = year + "-" + month + "-" + date + "_" + hours + ":" + minutes + ":" + seconds;
  return time;
}

module.exports = { generateTime: generateTime };