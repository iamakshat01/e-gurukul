const fs = require('fs');

// function to delete files from the sytem, based on the array of paths 'files'

const deleteFiles = (files) => {
    files.forEach(file => {
        fs.unlink(file,(err) => {
            if(err){
                console.log(`Could not remove file : ${file}`);
            }
            else{
                console.log('Files deleted successfully!');
            }
        });
    });
}

module.exports = deleteFiles;