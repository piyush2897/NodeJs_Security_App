var mongo=require('mongodb');
var mongoClient=mongo.MongoClient;
var url="mongodb://localhost:27017/pro1";


module.exports = function(app)
{
	app.get('/user_details',function(req,res){
		var clientOtpConfirm = require('../Twilio/OTP_send.js');
		console.log(req.query.username);
		//console.log(clientOtpConfirm.b);
		if(clientOtpConfirm.b == req.query.OTP)
		{			
			//res.render('user_details');
			var s ='<html><head><title>User_details</title></head><h2>USERS DEATILS</h2><br><p>Welcome User!</p><form method="get" action="http://localhost:3000/prints_sites"><table><tr>PRINT SITES: </tr><tr><td>UserName:</td><td><input type="text" id="username" name="username" value="';
			s = s + req.query.username + '" name="UN"/></td></tr><tr><td><input type="submit" /></td></tr></table></form>';
			s = s + '<br><form method="get" action="http://localhost:3000/insert_another_site"><input name="main_username" id="main_username" type="hidden" value="';
			s = s + req.query.username +'"><table style="border:1px solid grey;border-radius:15px;"><tr>ADD ANOTHER SITE</tr><tr><td>SITE NAME</td><td><select name="site_list"><option value="facebook">facebook</option><option value="flipkart">flipkart</option><option value="gmail">gmail</option><option value="amazon">amazon</option></select>';
			s = s + '</td></tr><tr><td>USERNAME</td><td><input name="username" id="username" type="text"></td></tr><tr><td>PASSWORD</td><td><input type="password" name="password"></td></tr><tr><td><input type="submit" /></td></tr></table></form>';
			s = s + '<br><form method="get" action="http://localhost:3000/fblogin"><input name="main_username" id="main_username" type="hidden" value="';
			s = s +	req.query.username +'"><table><tr><td><input type="submit" value="FACEBOOK LOGIN"/></td></tr></table></form></html>';
			res.send(s);
		}
		else
		{
			res.render('fatal_error');
		}
	});
}