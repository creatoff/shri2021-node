const db = require('../modules/Database');
const File = require('../modules/File');

module.exports = (req, res) => {
  const deleted = db.remove(req.params.id);

  if (!deleted) {
    res.status(404).send("Sorry can't find that!");
  }

  const file = new File(deleted);
  res.send(file.toPublicJSON()).end();
};
