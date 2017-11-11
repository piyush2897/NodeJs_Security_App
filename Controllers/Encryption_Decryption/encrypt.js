var crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    key = '123456';

module.exports = function encrypt(text){
  var cipher = crypto.createCipher(algorithm,key)
  var crypted = cipher.update(text,'utf8','hex')
  crypted += cipher.final('hex');
  return crypted;
}
 


