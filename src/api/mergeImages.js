const console = require('console');
const fs = require('fs');
const path = require('path');
const { replaceBackground } = require('backrem');
const db = require('../modules/Database');
const File = require('../modules/File');

module.exports = (req, res) => {
  const {
    front, back, color, threshold,
  } = req.query;

  function idToFileStream(id) {
    const item = db.find(id);
    const file = new File(item);

    return fs.createReadStream(
      path.resolve(file.path),
    );
  }

  const frontStream = idToFileStream(front);
  const backStream = idToFileStream(back);

  const replaceArgs = [
    frontStream,
    backStream,
    Array.from(color.split(',')).map((el) => Number(el)),
    Number(threshold),
  ];

  replaceBackground(...replaceArgs).then(
    (readableStream) => {
      readableStream.pipe(res);
      readableStream.on('end', () => res.end());
    },
  ).catch((err) => console.log(err));
};
