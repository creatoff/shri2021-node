const { generateId } = require('../utils/generateId');

module.exports = class File {
  constructor({
    id, uploadedAt, size, path,
  }) {
    this.id = id || generateId();
    this.uploadedAt = uploadedAt || Date.now();
    this.size = size;
    this.path = path;
  }

  toJSON() {
    return {
      id: this.id,
      uploadedAt: this.uploadedAt,
      size: this.size,
      path: this.path,
    };
  }

  toPublicJSON() {
    return {
      id: this.id,
      uploadedAt: this.uploadedAt,
      size: this.size,
    };
  }
};
