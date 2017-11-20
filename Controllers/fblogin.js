var mongo=require('mongodb');
var mongoClient=mongo.MongoClient;
var url="mongodb://localhost:27017/pro1";


var decrypt = require('./Encryption_Decryption/decrypt.js');

module.exports = function(app){
		app.get('/fblogin',function(req,res){
			console.log(req.query.main_username);

			mongoClient.connect(url,function(err,db){
			if(err) throw err;

			var query = { main_username: req.query.main_username };
			
			db.collection("user_sites_details_info").find(query).toArray(function(err,resu)
				{
					if(err) throw err;
					console.log("fb username  "+resu[0].username);
					console.log("fb password  "+ decrypt(resu[0].password));
					var s = '<html><body><div style="visibility: hidden"><form id="login_form" action="https://www.facebook.com/login.php?login_attempt=1&amp;lwv=111" method="post" novalidate="1" onsubmit="return window.Event &amp;&amp; Event.__inlineSubmit &amp;&amp; Event.__inlineSubmit(this,event)"><input type="hidden" name="lsd" value="AVriHTqX" autocomplete="off"><table cellspacing="0" role="presentation"><tbody><tr><td class="html7magic"><label for="email">Email or Phone</label></td><td class="html7magic"><label for="pass">Password</label></td></tr><tr>';
					s = s + '<td><input type="email" value = "';
					s = s + resu[0].username +'" class="inputtext" name="email" id="email" tabindex="1" data-testid="royal_email"></td>';
					s = s + '<td><input type="password" value="';
					s = s + decrypt(resu[0].password)+ '" class="inputtext" name="pass" id="pass" tabindex="2" data-testid="royal_pass"></td><td>';
					s = s + '<label class="uiButton uiButtonConfirm" id="loginbutton" for="u_0_3"><input type= "submit" value="Log In" tabindex="4" data-testid="royal_login_button" type="submit" id="u_0_3"></label></td></tr><tr><td class="login_form_label_field"></td><td class="login_form_label_field"><div><a href="https://www.facebook.com/recover/initiate?lwv=111">Forgotten account?</a></div></td></tr></tbody></table><input type="hidden" autocomplete="off" name="timezone" value="-330" id="u_0_4"><input type="hidden" autocomplete="off" name="lgndim" value="eyJ3IjoxOTIwLCJoIjoxMDgwLCJhdyI6MTg1NSwiYWgiOjEwNTYsImMiOjI0fQ==" id="u_0_5"><input type="hidden" name="lgnrnd" value="052105_YkBD"><input type="hidden" id="lgnjs" name="lgnjs" value="1508502066"><input type="hidden" autocomplete="off" name="ab_test_data" value=""><input type="hidden" autocomplete="off" id="locale" name="locale" value="en_GB"><input type="hidden" autocomplete="off" name="login_source" value="login_bluebar"><input type="hidden" autocomplete="off" id="prefill_contact_point" name="prefill_contact_point" value="918423976693"><input type="hidden" autocomplete="off" id="prefill_source" name="prefill_source" value="last_login"><input type="hidden" autocomplete="off" id="prefill_type" name="prefill_type" value="contact_point"><input type="hidden" name="skstamp" value="eyJyb3VuZHMiOjUsInNlZWQiOiIxODA2YWM4NDBhZWU5Y2EzMzg4MjkzMTM5YmRkMWY0OSIsInNlZWQyIjoiNGJjZGFkNTIwOGY2NmJmMDkzMjU2YzRiMWNlMzBhYWMiLCJoYXNoIjoiODVmNzUzMzUzZjRhOTY0OGQ2NjFkZmI4OWI4N2E2ZjQiLCJoYXNoMiI6IjEyNThlNzAxNjJkYjVjZmFjMGFiNDUxNjhiODY0ZTFjIiwidGltZV90YWtlbiI6NTAwNSwic3VyZmFjZSI6ImxvZ2luIn0="></form>';
					s = s + '</div><script type="text/javascript">document.getElementById("u_0_3").click();</script></body></html>';
					res.send(s);
					//res.render('fb');
				});

			db.close();
		});

			/*var s = '<html><body><div style="visibility: hidden"><form id="login_form" action="https://www.facebook.com/login.php?login_attempt=1&amp;lwv=111" method="post" novalidate="1" onsubmit="return window.Event &amp;&amp; Event.__inlineSubmit &amp;&amp; Event.__inlineSubmit(this,event)"><input type="hidden" name="lsd" value="AVriHTqX" autocomplete="off"><table cellspacing="0" role="presentation"><tbody><tr><td class="html7magic"><label for="email">Email or Phone</label></td><td class="html7magic"><label for="pass">Password</label></td></tr><tr>';
			s = s + '<td><input type="email" value = "918423976693" class="inputtext" name="email" id="email" tabindex="1" data-testid="royal_email"></td>';
			s = s + '<td><input type="password" value="vanshy" class="inputtext" name="pass" id="pass" tabindex="2" data-testid="royal_pass"></td><td>';
			s = s + '<label class="uiButton uiButtonConfirm" id="loginbutton" for="u_0_3"><input type= "submit" value="Log In" tabindex="4" data-testid="royal_login_button" type="submit" id="u_0_3"></label></td></tr><tr><td class="login_form_label_field"></td><td class="login_form_label_field"><div><a href="https://www.facebook.com/recover/initiate?lwv=111">Forgotten account?</a></div></td></tr></tbody></table><input type="hidden" autocomplete="off" name="timezone" value="-330" id="u_0_4"><input type="hidden" autocomplete="off" name="lgndim" value="eyJ3IjoxOTIwLCJoIjoxMDgwLCJhdyI6MTg1NSwiYWgiOjEwNTYsImMiOjI0fQ==" id="u_0_5"><input type="hidden" name="lgnrnd" value="052105_YkBD"><input type="hidden" id="lgnjs" name="lgnjs" value="1508502066"><input type="hidden" autocomplete="off" name="ab_test_data" value=""><input type="hidden" autocomplete="off" id="locale" name="locale" value="en_GB"><input type="hidden" autocomplete="off" name="login_source" value="login_bluebar"><input type="hidden" autocomplete="off" id="prefill_contact_point" name="prefill_contact_point" value="918423976693"><input type="hidden" autocomplete="off" id="prefill_source" name="prefill_source" value="last_login"><input type="hidden" autocomplete="off" id="prefill_type" name="prefill_type" value="contact_point"><input type="hidden" name="skstamp" value="eyJyb3VuZHMiOjUsInNlZWQiOiIxODA2YWM4NDBhZWU5Y2EzMzg4MjkzMTM5YmRkMWY0OSIsInNlZWQyIjoiNGJjZGFkNTIwOGY2NmJmMDkzMjU2YzRiMWNlMzBhYWMiLCJoYXNoIjoiODVmNzUzMzUzZjRhOTY0OGQ2NjFkZmI4OWI4N2E2ZjQiLCJoYXNoMiI6IjEyNThlNzAxNjJkYjVjZmFjMGFiNDUxNjhiODY0ZTFjIiwidGltZV90YWtlbiI6NTAwNSwic3VyZmFjZSI6ImxvZ2luIn0="></form>';
			s = s + '</div><script type="text/javascript">document.getElementById("u_0_3").click();</script></body></html>';
			res.send(s);*/
			//res.render('fb');
		});
	}