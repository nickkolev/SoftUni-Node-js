const util = require("util");
const jwt = require("jsonwebtoken");

function sign(payload, secretOrPrivateKey, options = {}) {
    const promise = new Promise((resolve, reject) => {
        jwt.sign(payload, secretOrPrivateKey, options, (err, token) => {
            if(err) {
                reject(err);
            }
            resolve(token);
        })
    });

    return promise;
}

// util.promisify взима функцията която му подаваме и ще я превърне в promise версията и
// от callback ф-я я превръща в promise ф-я
const verify = util.promisify(jwt.verify);

module.exports = {
    sign,
    verify,
};