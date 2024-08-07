const fs = require('fs');
const catsData = require('./cats.json');
const cats =  catsData.slice();
const path = require('path');

function add(name) {
 cats.push(name);
 fs.writeFile('cats.json', JSON.stringify(cats, null, 2), (err) => {
    if (err) {
      console.log('Error writing file:', err);
    } else {
      console.log('File written successfully');
    }
  });
};

function getAll() {
    return cats.slice();
}

module.exports={
    add,
    getAll,
    
}