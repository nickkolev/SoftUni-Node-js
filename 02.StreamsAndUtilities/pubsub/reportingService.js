const messageBroker = require('./messageBroker');

messageBroker.subscribe('request', add);
messageBroker.subscribe('user-register', userRegister)

function add(data) {
    console.log('Reporting Service:' + data);
}

function userRegister(data) {
    console.log('Reporting Service: User register' + data.username);
}

module.exports = add;