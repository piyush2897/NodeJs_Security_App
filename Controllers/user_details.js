var mongo=require('mongodb');
var mongoClient=mongo.MongoClient;
var url="mongodb://localhost:27017/pro1";

module.exports = function(app)
{
	app.get('/user_details',function(req,res){
		res.render('user_details');
	});
}