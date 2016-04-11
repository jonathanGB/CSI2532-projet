var pg = require('pg'),
    conString = 'postgres://postgres:root@localhost:5432/projet-csi2532';

exports.GetQuery1 = (controllerCallback) => {
  var results = [];

  pg.connect(conString, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return controllerCallback([]);
    }

    // SQL Query > Select Data
    var query = client.query(`
      SELECT *
      FROM Medecin
      ORDER BY nom;
    `);

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



exports.GetQuery2 = (controllerCallback) => {
  var results = [];

  pg.connect(conString, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return controllerCallback([]);
    }

    // SQL Query > Select Data
    var query = client.query(`
      SELECT *
      FROM Patient
      WHERE medecinID = 'M001';
    `);

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


exports.GetQuery3 = (controllerCallback) => {
  var results = [];

  pg.connect(conString, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return controllerCallback([]);
    }

    // SQL Query > Select Data
    var query = client.query(`
      SELECT *
      FROM Patient
      WHERE medecinID IN (
        SELECT medecinID
	      FROM Medecin
	      WHERE nom LIKE '%blay%' OR nom LIKE '%Blay%'
      );
  `);

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


exports.GetQuery4 = (controllerCallback) => {
  var results = [];

  pg.connect(conString, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return controllerCallback([]);
    }

    // SQL Query > Select Data
    var query = client.query(`
      SELECT *
      FROM Patient
      WHERE medecinID IN (
        SELECT medecinID
	      FROM Medecin
        WHERE nom = 'Tremblay' OR nom = 'Solo'
      );
  `);

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


exports.GetQuery5 = (controllerCallback) => {
  var results = [];

  pg.connect(conString, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return controllerCallback([]);
    }

    // SQL Query > Select Data
    var query = client.query(`
      SELECT *
      FROM Patient
      WHERE SSN IN (
        SELECT SSN
        FROM PathologiePatient
        WHERE nomP = 'Rhume'
      )
      AND SSN NOT IN (
        SELECT SSN
        FROM PathologiePatient
        WHERE nomP = 'Grippe'
      );
  `);

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


exports.GetQuery6 = (controllerCallback) => {
  var results = [];

  pg.connect(conString, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return controllerCallback([]);
    }

    // SQL Query > Select Data
    var query = client.query(`
      SELECT *
      FROM Medecin
      WHERE medecinID IN (
        SELECT medecinID
        FROM Patient
        WHERE SSN IN (
          SELECT SSN
          FROM PathologiePatient
          WHERE nomP = 'Rhume'
        )
		    AND SSN IN (
          SELECT SSN
          FROM PathologiePatient
          WHERE nomP = 'Grippe'
        )
      );
  `);

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


exports.GetQuery7 = (controllerCallback) => {
  var results = [];

  pg.connect(conString, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return controllerCallback([]);
    }

    // SQL Query > Select Data
    var query = client.query(`
      SELECT COUNT(SSN)
      FROM Patient
      WHERE medecinID IN (
        SELECT medecinID
        FROM Medecin
        WHERE nom = 'Tremblay'
      )
	    AND SSN IN (
        SELECT SSN
        FROM PathologiePatient
        WHERE nomP = 'Cancer du foie'
      );
  `);

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


exports.GetQuery8 = (controllerCallback) => {
  var results = [];

  pg.connect(conString, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return controllerCallback([]);
    }

    // SQL Query > Select Data
    var query = client.query(`
      SELECT COUNT(SSN)
      FROM Patient
      WHERE medecinID IN (
        SELECT medecinID
        FROM Medecin
        WHERE nom = 'Tremblay'
      )
	    AND SSN NOT IN (
        SELECT SSN
        FROM PathologiePatient
        WHERE nomP = 'Cancer du foie'
      );
  `);

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


exports.GetQuery9 = (controllerCallback) => {
  var results = [];

  pg.connect(conString, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return controllerCallback([]);
    }

    // SQL Query > Select Data
    var query = client.query(`
      SELECT Medecin.medecinID, Medecin.nom, COUNT(Patient.SSN) AS nombrePatients
      FROM Patient NATURAL JOIN Medecin
      GROUP BY Medecin.medecinID;
  `);

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


exports.GetQuery10 = (controllerCallback) => {
  var results = [];

  pg.connect(conString, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return controllerCallback([]);
    }

    // SQL Query > Select Data
    var query = client.query(`
      SELECT Medecin.medecinID, COUNT(Patient.SSN) AS nombrePatients
      FROM Patient NATURAL JOIN Medecin
      WHERE Patient.SSH IN (
        SELECT SSN
        FROM PathologiePatient
        WHERE nomP LIKE '%cancer' OR LIKE '%Cancer'
      )
      GROUP BY Medecin.medecinID;
  `);

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


exports.GetQuery11 = (controllerCallback) => {
  var results = [];

  pg.connect(conString, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return controllerCallback([]);
    }

    // SQL Query > Select Data
    var query = client.query(`
      SELECT *
      FROM Patient
      WHERE medecinID IN
        (SELECT medecinID
	          FROM Medecin
	          WHERE nom LIKE '%blay%' OR nom LIKE '%Blay%'
        );
  `);

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


exports.GetQuery12 = (controllerCallback) => {
  var results = [];

  pg.connect(conString, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return controllerCallback([]);
    }

    // SQL Query > Select Data
    var query = client.query(`
      SELECT *
      FROM Patient
      WHERE medecinID IN
        (SELECT medecinID
	          FROM Medecin
	          WHERE nom LIKE '%blay%' OR nom LIKE '%Blay%'
        );
  `);

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


exports.GetQuery13 = (controllerCallback) => {
  var results = [];

  pg.connect(conString, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return controllerCallback([]);
    }

    // SQL Query > Select Data
    var query = client.query(`
      SELECT *
      FROM Patient
      WHERE medecinID IN
        (SELECT medecinID
	          FROM Medecin
	          WHERE nom LIKE '%blay%' OR nom LIKE '%Blay%'
        );
  `);

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


exports.GetQuery14 = (controllerCallback) => {
  var results = [];

  pg.connect(conString, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return controllerCallback([]);
    }

    // SQL Query > Select Data
    var query = client.query(`
      SELECT *
      FROM Patient
      WHERE medecinID IN
        (SELECT medecinID
	          FROM Medecin
	          WHERE nom LIKE '%blay%' OR nom LIKE '%Blay%'
        );
  `);

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


exports.GetQuery15 = (controllerCallback) => {
  var results = [];

  pg.connect(conString, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return controllerCallback([]);
    }

    // SQL Query > Select Data
    var query = client.query(`
      SELECT *
      FROM Patient
      WHERE medecinID IN
        (SELECT medecinID
	          FROM Medecin
	          WHERE nom LIKE '%blay%' OR nom LIKE '%Blay%'
        );
  `);

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
