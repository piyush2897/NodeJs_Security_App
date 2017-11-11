var mongo=require('mongodb');
var mongoClient=mongo.MongoClient;
var url="mongodb://localhost:27017/pro1";


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
		mongoClient.connect(url,function(err,db){
			if(err) throw err;
			db.collection("main_login").insertMany(starterTodos,
				function(err,resu){
					if(err) throw err;
					res.render('register');
				});
			db.close();
		});
	});	
}	