var pg = require('pg'),
    conString = 'postgres://postgres:root@localhost:5432/projet-csi2532';

exports.isSecretaire = (controllerCallback) => {
  console.log('wazzza');

  var results = [];

  pg.connect(conString, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      controllerCallback([]);
    }

    // SQL Query > Select Data
    var query = client.query("SELECT * FROM Secretaire;");

    // Stream results back one row at a time
    query.on('row', function(row) {
        results.push(row);
    });

    // After all data is returned, close connection and return results
    query.on('end', function() {
        done();

        controllerCallback(results);
    });
  });
}
