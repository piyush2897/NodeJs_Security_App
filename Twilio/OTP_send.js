// Load the twilio module
var twilio = require('twilio');
 

process.env.TWILIO_ACCOUNT_SID = 'ACf9a6bbc884d06a5aa7b3f3411e6248e5';
process.env.TWILIO_AUTH_TOKEN = '2dce3b480599bd8a95753ca6ef777ebb';

var OTP = require('./OTP_generate.js');
console.log(OTP);

var client = new twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN );
client.messages.create({
    to:'+917206305374',
    from:'+14053522120',
    body:OTP
}, function(error, message) {
    if (!error) {
        console.log('Success! The SID for this SMS message is:');
        console.log(message.sid);
 
        console.log('Message sent on:');
        console.log(message.dateCreated);
    } else {
        console.log('Oops! There was an error.');
    }
});

