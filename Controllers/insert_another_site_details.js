var mongo=require('mongodb');
var mongoClient=mongo.MongoClient;
var url="mongodb://localhost:27017/pro1";

var encrypt = require('./Encryption_Decryption/encrypt.js');

module.exports = function(app)
{
	app.get('/insert_another_site',function(req,res){
		var starterTodos =[
			{
				site: req.query.site_list,
				username: req.query.username,
				password: encrypt(req.query.password)
			}
		];
		mongoClient.connect(url,function(err,db){
			if(err) throw err;
			db.collection("user_sites_details").insertMany(starterTodos,
				function(err,resu){
					if(err) throw err;
					res.render('user_details');
				});
			db.close();
		});
		
	});
}