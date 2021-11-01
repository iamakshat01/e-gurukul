const multer = require('multer');

const storage = multer.memoryStorage();

const parseFile = (fieldName) => {
    return multer({storage}).single(fieldName);
};

module.exports = parseFile;