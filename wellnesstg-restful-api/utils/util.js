const generateTime = function() {
  const ts = Date.now();
  const date_ob = new Date(ts);
  const date = date_ob.getDate();
  const month = date_ob.getMonth() + 1;
  const year = date_ob.getFullYear();
  const hours = date_ob.getHours();
  const minutes = date_ob.getMinutes();
    const seconds = date_ob.getSeconds();

  return `${year}-${month}-${date}_${hours}:${minutes}:${seconds}`;
}

module.exports = { generateTime: generateTime };