const db = require('../modules/Database');
const File = require('../modules/File');

module.exports = (req, res) => {
  const items = db.index();

  const list = items.map(((item) => new File(item).toPublicJSON()));
  res.send(list);

  res.end();
};
