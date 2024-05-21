const fs = require('fs');

fs.writeFile('./created.txt', 'Hello World', { encoding: 'utf-8', flag: 'a' }, (err) => {
    if (err) {
        return;
    }

    console.log('File is created');
})