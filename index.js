var fs = require('fs');
var path = require('path');
var PGPASS_FILE = path.join(__dirname, "./.pgpass");

var pgtokens = fs.readFileSync(PGPASS_FILE).toString().trimRight().split(":");
var host = pgtokens[2];
var port = pgtokens[3];
var dbname = pgtokens[4];
var user = pgtokens[0];
var password = pgtokens[1];
//for illustrative purposes, do not leave this in production!!
//console.log("postgres://%s:%s@%s:%s/%s",user,password,host,port,dbname);

var conString = "postgres://"+user+":"+password+"@"+host+":"+port+"/"+dbname;

var pg = require('pg.js');


//var conString = "postgres://myusername:mypassword@hostname:5432/dbname";
//it's a url, so don't forget to encode password for URL 
//in production put connection string into a seperate .pgpass file

//var conString = "postgres://nodetest:Welcome1@localhost:5432/nodetest";

pg.connect(conString, function(err, client, done) {
  if(err) {
    return console.error('error fetching client from pool', err);
  }
  client.query("CREATE TEMP TABLE reviews(id SERIAL, author VARCHAR(50), content TEXT)");
  client.query("INSERT INTO reviews(author, content) VALUES($1, $2)",
    ["mad_reviewer", "I'd buy this any day of the week!!11"]);
  client.query("INSERT INTO reviews(author, content) VALUES($1, $2)",
    ["calm_reviewer", "Yes, that was a pretty good product."]);
  client.query("SELECT * FROM reviews", function(err, result) {
  console.log("Row count: %d",result.rows.length);  // 1
  for (var i = 0; i < result.rows.length; i++) {
    var row = result.rows[i];
    console.log("id: " + row.id);
    console.log("author: " + row.author);
    console.log("content: " + row.content);
  }
});
  //call `done()` to release the client back to the pool
  done();
});