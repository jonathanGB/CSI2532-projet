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
    var query = client.query("SELECT * FROM Medecin WHERE medecinId = $1;", [medecinId]);

    // Stream results back one row at a time
    query.on('row', function(row) {
        results.push(row);
    });

    // After all data is returned, close connection and return results
    query.on('end', function() {
        done();
        console.log(results);
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

exports.newConsultation = (userData, controllerCallback) => {
  var results = [];

  pg.connect(conString, function(err, client, done) {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return controllerCallback(true);
    }

    // medecin is linked with the right secretaire
    var query = client.query('SELECT * FROM Medecin WHERE medecinId = $1 AND phoneNoS = $2', [userData[0], userData[1]]);

    query.on('row', function(row) {
        results.push(row);
    });

    query.on('end', function() {
      if (results.length === 0) {
        done();
        return controllerCallback(true);
      } else {
        var results2 = [];
        // patient is linked with the right medecin
        var query2 = client.query('SELECT * FROM Patient WHERE SSN = $1 AND medecinId = $2', [userData[2], userData[0]]);

        query2.on('row', function(row) {
            results2.push(row);
        });

        query2.on('end', function() {
          if (results2.length === 0) {
            done();
            return controllerCallback(true)
          }
          else {
            var results3 = [];
            // no conflict
            var query3 = client.query('SELECT * FROM Consultation WHERE date = $1 AND heureDebut = $2 AND (medecinId = $3 OR SSN = $4)', [userData[4], userData[5], userData[0], userData[2]]);

            query3.on('row', function(row) {
                results3.push(row);
            });

            query3.on('end', function() {
              if (results3.length > 0) {
                done();
                return controllerCallback(true);
              }
              else {
                // SQL Query > Insert Data
                client.query('INSERT INTO  Consultation values($1, $2, $3, $4, $5, $6)', userData, (err) => {
                  controllerCallback(err);
                  done();
                });
              }
            });
          }
        });
      }
    });
  });
};


exports.getConsultations = (dataSent, controllerCallback) => {
  var results = [];

  pg.connect(conString, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return controllerCallback([]);
    }
    var query;

      if (dataSent[0] === 'medecinId')
        query = client.query("SELECT * FROM Consultation WHERE medecinId = $1 ORDER BY date, heureDebut", [dataSent[1]]);
      else if (dataSent[0] === 'phoneNoS')
        query = client.query("SELECT * FROM Consultation WHERE phoneNoS = $1 ORDER BY date, heureDebut", [dataSent[1]]);
      else
        query = client.query("SELECT * FROM Consultation WHERE SSN = $1 ORDER BY date, heureDebut", [dataSent[1]]);

    // Stream results back one row at a time
    query.on('row', function(row) {
        results.push(row);
    });

    // After all data is returned, close connection and return results
    query.on('end', function() {
      console.log('end');
      done();
      controllerCallback(results);
    });
  });
};


exports.updateObjet = (dataSent, controllerCallback) => {
  pg.connect(conString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return controllerCallback(true);
        }

        // SQL Query > Insert Data
        client.query('UPDATE Consultation SET objet = $4 WHERE SSN = $1 AND date = $2 AND heureDebut = $3', dataSent, (err) => {
          controllerCallback(err);
          done();
        });
    });
};
