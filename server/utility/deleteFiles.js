const fs = require('fs');
const path = require('path');

// function to delete files from the sytem, based on the array of paths 'files'

const deleteFiles = (files) => {
    files.forEach(file => {
        let filePath = path.resolve(__dirname, '..','public','uploads', file.substring(file.lastIndexOf('/')+1));
        fs.unlink(filePath,(err) => {
            if(err){
                console.log(`Could not remove file : ${filePath}`);
            }
            else{
                console.log('Files deleted successfully!');
            }
        });
    });
}

module.exports = deleteFiles;