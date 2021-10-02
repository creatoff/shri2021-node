const db = require('../modules/Database');
const File = require('../modules/File');

module.exports = (req, res) => {
  const item = db.find(req.params.id);

  if (!item) {
    res.status(404).send("Sorry can't find that!");
  }

  const file = new File(item);
  const { path } = file;

  res.download(path);
};
