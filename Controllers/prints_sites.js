var mongo=require('mongodb');
var mongoClient=mongo.MongoClient;
var url="mongodb://localhost:27017/pro1";

module.exports = function(app)
{
	console.log("Inside");
	app.get('/prints_sites',function(req,res){

		mongoClient.connect(url,function(err,db){
			if(err) throw err;
				var c=1;
			/*var c=db.collection("user_sites_details").count({},function(err,count)
			{	
				if(err) throw err;
					c=count;
			});*/
			var query = { main_username: req.query.username };
			
			db.collection("user_sites_details_info").find(query).toArray(function(err,resu)
				{
					if(err) throw err;
					res.send(resu);
				});

			db.close();
		});
		
	});
}

