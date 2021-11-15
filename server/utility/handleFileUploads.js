const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve(__dirname,'..','public','uploads'));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
});

module.exports = (fieldName, maxCount = 1) => {
    return multer({
        storage: storage,
        fileFilter: (req, file, cb) => {
            let ext = path.extname(file.originalname);
            var validExts = ['.pdf', '.doc', '.docx', '.txt', '.xls', '.xlsx'];

            if(validExts.indexOf(ext) !== -1){
                cb(null, true);
            }
            else{
                let err = new Error('File format not allowed.');
                err.status = 403;
                cb(err);
            }
        }
    }).array(fieldName, maxCount);
};
