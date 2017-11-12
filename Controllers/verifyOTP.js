var mongo=require('mongodb');
var mongoClient=mongo.MongoClient;
var url="mongodb://localhost:27017/pro1";

ObjectId = require('mongodb').ObjectID

var md5 = require('md5');

module.exports = function(app)
{
	app.get('/verify_otp',function(req,res){

		var enteredPassword = md5(req.query.password);
		console.log("User entered Password " + enteredPassword);

		query = { _id : ObjectId(req.query.username) };

	mongoClient.connect(url,function(err,db){
			if(err) throw err;
			db.collection("main_login").find(query).toArray(function(err, result) {
	    		if (err) throw err;
	    		//console.log(result[0].todo);
	    		if(result[0].todo == enteredPassword)
	    		{
	    			db.close();
	    			var clientOtpConfirm = require('../Twilio/OTP_send.js');
					res.render('verify_otp');
	    		}
	    		else
	    		{
	    			db.close();
	    			res.render('fatal_error2');
	    		}
	  		});
	  	});	
	});
}