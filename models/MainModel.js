var pg = require('pg'),
    conString = 'postgres://postgres:root@localhost:5432/projet-csi2532';

exports.isMedecin = (medecinId, controllerCallback) => {
  var results = [];

  pg.connect(conString, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return controllerCallback([]);
    }

    // SQL Query > Select Data
    var query = client.query("SELECT * FROM Medecin WHERE phoneNoS = $1;", [medecinId]);

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
};

exports.isSecretaire = (tel, controllerCallback) => {
  var results = [];

  pg.connect(conString, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return controllerCallback([]);
    }

    // SQL Query > Select Data
    var query = client.query("SELECT * FROM Secretaire WHERE phoneNoS = $1;", [tel]);

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
};

exports.isPatient = (SSN, controllerCallback) => {
  var results = [];

  pg.connect(conString, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return controllerCallback([]);
    }

    // SQL Query > Select Data
    var query = client.query("SELECT * FROM Patient WHERE SSN = $1;", [SSN]);

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
};

exports.insertMedecin = (userData, controllerCallback) => {
  pg.connect(conString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return controllerCallback(true);
        }

        // SQL Query > Insert Data
        client.query('INSERT INTO  Medecin values($1, $2, $3, $4, $5, $6, $7)', userData, (err) => {
          controllerCallback(err);
          done();
        });
    });
};

exports.insertSecretaire = (userData, controllerCallback) => {
  pg.connect(conString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return controllerCallback(true);
        }

        // SQL Query > Insert Data
        client.query('INSERT INTO  Secretaire values($1, $2, $3, $4)', userData, (err) => {
          controllerCallback(err);
          done();
        });
    });
};

exports.insertPatient = (userData, controllerCallback) => {
  pg.connect(conString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return controllerCallback(true);
        }

        // SQL Query > Insert Data
        client.query('INSERT INTO  Patient values($1, $2, $3, $4, $5, $6, $7, $8)', userData, (err) => {
          controllerCallback(err);
          done();
        });
    });
};
