var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/pro1";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var obj = {username: "piyush" , password: "123"};
  db.collection("main_login").insertOne(obj,function(err,res){
  		if(err) throw err;
  		console.log("1 document Inserted");
  		db.close();
  });
});