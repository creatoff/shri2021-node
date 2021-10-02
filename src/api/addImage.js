const db = require('../modules/Database');
const File = require('../modules/File');

module.exports = (req, res) => {
  const file = new File({
    id: req.file.id,
    size: req.file.size,
    path: req.file.path,
  });

  db.insert(file);

  res.send(file.toJSON());
  res.end();
};
