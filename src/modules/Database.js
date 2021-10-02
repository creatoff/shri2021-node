/* eslint-disable global-require */
const { EventEmitter } = require('events');
const { existsSync } = require('fs');
const { writeFile } = require('fs/promises');
const { dbDumpFile } = require('../config');

class Database extends EventEmitter {
  constructor() {
    super();
    this.images = [];
  }

  async initFromDump() {
    if (existsSync(dbDumpFile) === false) {
      return;
    }

    // eslint-disable-next-line import/no-dynamic-require
    const dump = require(dbDumpFile);
    this.images = dump.images;
  }

  index() {
    return this.images;
  }

  async insert(file) {
    this.images.push(file.toJSON());
    this.emit('changed');
  }

  find(itemId) {
    const item = this.images.find(({ id }) => id === itemId);

    if (!item) {
      return null;
    }

    return item;
  }

  remove(itemId) {
    const item = this.find(itemId);

    if (!item) {
      return null;
    }

    this.images = this.images.filter(({ id }) => id !== itemId);
    return item;
  }

  toJSON() {
    return {
      images: this.images,
    };
  }
}

const db = new Database();

db.initFromDump();

db.on('changed', () => {
  writeFile(dbDumpFile, JSON.stringify(db.toJSON(), null, '\t'));
});

module.exports = db;
