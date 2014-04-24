var pg = require('pg.js');

//var conString = "postgres://myusername:mypassword@hostname:5432/dbname";
//it's a url, so don't forget to encode password for URL 
//in production put connection string into a seperate .pgpass file

var conString = "postgres://nodetest:Welcome1@localhost:5432/nodetest";


pg.connect(conString, function(err, client, done) {
  if(err) {
    return console.error('error fetching client from pool', err);
  }
  client.query('SELECT NOW() as when', function(err, result) {

    if(err) {
      return console.error('error running query', err);
    }

    console.log("Row count: %d",result.rows.length);
    console.log("Current year: %d",result.rows[0].when.getFullYear());
    //output: 1

    //call `done()` to release the client back to the pool
    done();
  });
});