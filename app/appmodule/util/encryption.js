var encr = module.exports = {};


var crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = 'gyocryt$';

encr.encrypt = function(text) {
    var cipher = crypto.createCipher(algorithm, password)
    var crypted = cipher.update(text, 'utf8', 'hex')
    crypted += cipher.final('hex');
    return crypted;
}

encr.decrypt = function(text) {
    var decipher = crypto.createDecipher(algorithm, password)
    var dec = decipher.update(text, 'hex', 'utf8')
    dec += decipher.final('utf8');
    return dec;
}
