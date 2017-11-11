var express =require('express');
var app =express();
var path = require('path');
var formidable = require('formidable');
var fs = require('fs');

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/pro1";

var port= process.env.PORT || 3000;
app.use('/assets', express.static(__dirname + '/public'));
app.set('view engine','ejs');

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  db.createCollection("main_login",function(req,res){
  console.log("Database created!");
  db.close();
	});
});

/* Controllers */

var register_user =require('./Controllers/register_user.js');
var setupControllers =require('./Controllers/Print_users.js');
var insert_another_site = require('./Controllers/insert_another_site_details.js');
var prints_sites = require('./Controllers/prints_sites.js');
var user_details = require('./Controllers/user_details.js');

app.get('/',function(req,res){
	res.render('register');
});

prints_sites(app);	
insert_another_site(app);
register_user(app);
setupControllers(app);
user_details(app);

app.listen(port);