var mongo=require('mongodb');
var mongoClient=mongo.MongoClient;
var url="mongodb://localhost:27017/pro1";


var twilio = require('twilio');

process.env.TWILIO_ACCOUNT_SID = 'ACf9a6bbc884d06a5aa7b3f3411e6248e5';
process.env.TWILIO_AUTH_TOKEN = '2dce3b480599bd8a95753ca6ef777ebb';

var md5 = require('md5');

module.exports = function(app){

app.get('/register',function(req,res)
	{
var starterTodos =[
			{
				username: req.query.username,
				todo: md5(req.query.password),
			}
		];
		//global.globalString = "1";  
		mongoClient.connect(url,function(err,db){
			if(err) throw err;
			
			var query = { username : req.query.username };

			//insert
			db.collection("main_login").insertMany(starterTodos,
				function(err,resu){
					if(err) throw err;
			});	

			db.collection("main_login").find({
				username: req.query.username,
				todo: md5(req.query.password),
			}).toArray(function(err,resu)
				{
					if(err) throw err;

					console.log(resu[0]._id);
					var c = resu[0]._id;

					//sending unique userid to the user
					var client = new twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN );
					client.messages.create({
					    to:'+917206305374',
					    from:'+14053522120',
					    body: "Your Unique UserId is " + String(c)
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
				});			
			db.close();
		});
		res.render('register');
	});	
}	