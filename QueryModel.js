var pg = require('pg'),
    conString = 'postgres://postgres:Homere69@localhost:5432/projet-csi2532';

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
      SELECT Medecin.medecinID, Medecin.nom, COUNT(Patient.SSN)
FROM Patient, Medecin
WHERE Medecin.medecinID = Patient.medecinID
GROUP BY Medecin.nom, Medecin.medecinID;
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
      SELECT Medecin.medecinID, COUNT(Patient.SSN)
FROM Patient, Medecin
WHERE Medecin.medecinID = Patient.medecinID
	AND Patient.SSN IN (SELECT SSN
					FROM PathologiePatient
					WHERE nomP LIKE '%Cancer%')
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
      SELECT * FROM Medicament WHERE nomM IN
	(SELECT nom FROM PrescriptionM WHERE SSN = 'P001') AND
	(nomS IN (SELECT nomS1 FROM ContreIndicationSubSub WHERE nomS2 IN (SELECT nomS FROM Medicament WHERE nomM = 'M003'))
	OR (nomS IN (SELECT nomS2 FROM ContreIndicationSubSub WHERE nomS1 IN (SELECT nomS FROM Medicament WHERE nomM = 'M003'))));

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
FROM ((SELECT nomS AS Substance, nomS2 AS Incompatible
FROM SubstanceActive LEFT OUTER JOIN ContreIndicationSubSub ON (SubstanceActive.nomS = ContreIndicationSubSub.nomS1)) UNION (SELECT nomS AS Substance, nomS1 AS Incompatible
FROM SubstanceActive LEFT OUTER JOIN ContreIndicationSubSub ON (SubstanceActive.nomS = ContreIndicationSubSub.nomS2))) AS Substances;
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
      CREATE contrindic() RETURNS trigger AS $emp_stamp$
	BEGIN
		IF NEW.nom IN (SELECT nomM FROM Medicament WHERE
			(nomS IN (SELECT nomS1 FROM ContreIndicationSubSub WHERE nomS2 IN (SELECT nomS FROM Medicament WHERE nomM IN (SELECT nom FROM PrescriptionM WHERE SSN = NEW.SSN)))
			OR (nomS IN (SELECT nomS2 FROM ContreIndicationSubSub WHERE nomS1 IN (SELECT nomS FROM Medicament WHERE nomM IN (SELECT nom FROM PrescriptionM WHERE SSN = NEW.SSN))))
			OR (nomS IN (SELECT nomS FROM ContreIndicationSubPatho WHERE nomP IN (SELECT nomP FROM PathologiePatient WHERE SSN = NEW.SSN)))
			OR (nomM IN (SELECT nomM FROM ContreIndicationMediPatho WHERE nomP IN (SELECT nomP FROM PathologiePatient WHERE SSN = NEW.SSN))))) THEN
			RAISE EXCEPTION 'Ce médicament est contre-indiqué pour ce patient.';
			ELSE RETURN NEW;
			END IF;
	END;
$emp_stamp$ LANGUAGE plpgsql;

CREATE IF NOT EXISTS TRIGGER contreindication
BEFORE INSERT OR UPDATE ON PrescriptionM
FOR EACH ROW
EXECUTE PROCEDURE contrindic();

--Ci-joint deux lignes utiles pour tester le code.
--INSERT INTO HopitalDB.Consultation VALUES ('M001','333-111-1111','P001','Test','11/04/2016','12:00');
--INSERT INTO HopitalDB.PrescriptionM VALUES ('P3','P001','12:00','11/04/2016','M003',20);
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
      DELETE FROM Medecin WHERE nom = 'Bos' AND prenom = 'Johan';
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
      UPDATE public.Patient SET adresse = 'Elysee, Paris, France' WHERE nom = 'Valls' AND prenom = 'Manuel';
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
