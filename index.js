var pg = require('pg.js');

//var conString = "postgres://myusername:mypassword@hostname:5432/dbname";
//it's a url, so don't forget to encode password for URL 
//in production put connection string into a seperate .pgpass file

var conString = "postgres://nodetest:Welcome1@localhost:5432/nodetest";

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