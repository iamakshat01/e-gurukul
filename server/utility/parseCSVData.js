const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');
const {Readable} = require('stream');

const parseCSVBuffer = (buffer) => {
    let results = [];
    const stream = new Readable();
    stream.push(buffer);
    stream.push(null);
    stream.pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
        return results;
    });
};

module.exports = parseCSVBuffer;