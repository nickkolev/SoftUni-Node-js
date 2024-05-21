const fs = require('fs');
// const fs = require('fs/promises');

// SYNCHRONOUS
// const text = fs.readFileSync('./data.txt', { encoding: 'utf-8' });
// console.log(text);

// ASYNCHRONOUS with Callback
console.log(1);
fs.readFile('./data.txt', { encoding: 'utf-8'}, (err, text) => {
    if (err) {
        console.log('There is a problem with the filesystem');
        return;
    }
    console.log(2);

    console.log(text);
})
console.log(3);

// ASYNC with promises
// fs.readFile('./data.txt', {encoding: 'utf-8'})
//     .then(result => {
//         console.log(result);
//     })
//     .catch(err => {
//         console.log(`there is an error with the file system`);
//     });