var MainModel = require('../models/MainModel');

exports.Index = (req, res) => {
  if (req.session.user) {
    var data; // grab the response from the model
    var type = req.session.user.type;

    if (type === 'Médecin') {
      var credential = req.session.user.medecinid;

      MainModel.isMedecin(credential, (data) => {
        if (data.length > 0) {
          var result = {};
          result['data'] = data;
          result['type'] = type;
          return res.render('Index', result);
        } else
          return res.send('error');
      });
    } else if (type === 'Secrétaire') {
      var credential = req.session.user.phonenos;

      MainModel.isSecretaire(credential, (data) => {
        if (data.length > 0) {
          var result = {};
          result['data'] = data;
          result['type'] = type;
          return res.render('Index', result);
        } else
          return res.send('error');
      });
    } else if (type === 'Patient') {
      var credential = req.session.user.ssn;

      MainModel.isPatient(credential, (data) => {
        if (data.length > 0) {
          var result = {};
          result['data'] = data;
          result['type'] = type;
          return res.render('Index', result);
        } else
          return res.send('error');
      });
    } else
      return res.send({'status': 'no type provided'});
  }
  else {
    res.redirect('/register');
  }
};

exports.Login = (req, res) => {
    if (req.session.user)
      res.redirect('/');
    else
      res.render('Login')
}

exports.Register = (req, res) => {
  if (req.session.user)
    res.redirect('/');
  else
    res.render('Register');
}

exports.Logout = (req, res) => {
  if (req.session.user)
    res.render('Logout', req.session.user);
  else
    res.redirect('/register');
}

exports.ValidateLogin = (req, res) => {
  var data; // grab the response from the model
  var type = req.body.type;

  if (type === 'medecin') {
    MainModel.isMedecin(req.body.credential, (data) => {
      if (data.length > 0) {
        req.session.user = data[0];
        req.session.user.type = 'Médecin';
        return res.status(200).send('ok');
      } else
        return res.send('error');
    });
  } else if (type === 'secretaire') {
    MainModel.isSecretaire(req.body.credential, (data) => {
      if (data.length > 0) {
        req.session.user = data[0];
        req.session.user.type = 'Secrétaire';
        return res.status(200).send('ok');
      } else
        return res.send('error');
    });
  } else if (type === 'patient') {
    MainModel.isPatient(req.body.credential, (data) => {
      if (data.length > 0) {
        req.session.user = data[0];
        req.session.user.type = 'Patient';
        return res.status(200).send('ok');
      } else
        return res.send('error');
    });
  } else
    return res.send({'status': 'no type provided'});
}

exports.ValidateRegister = (req, res) => {
  var errInsert; // grab the response from the model
  var type = req.body.type;

  console.log(req.body.credential);

  if (type === 'medecin') {
    MainModel.insertMedecin(req.body.credential, (errInsert) => {
      if (errInsert){
        console.log(errInsert);
        res.send('error');
      } else {
        req.session.user = {};
        req.session.user.medecinid = req.body.credential[0];
        req.session.user.nom = req.body.credential[2];
        req.session.user.prenom = req.body.credential[3];
        req.session.user.type = 'Médecin';

        res.status(200).send('ok');
      }
    });
  } else if (type === 'secretaire') {
    MainModel.insertSecretaire(req.body.credential, (errInsert) => {
      if (errInsert){
        console.log(errInsert);
        res.send('error');
      } else {
        req.session.user = {};
        req.session.user.phonenos = req.body.credential[0];
        req.session.user.nom = req.body.credential[1];
        req.session.user.prenom = req.body.credential[2];
        req.session.user.type = 'Secrétaire';

        console.log(req.session.user);
        res.status(200).send('ok');
      }
    });
  } else if (type === 'patient') {
    MainModel.insertPatient(req.body.credential, (errInsert) => {
      if (errInsert){
        console.log(errInsert);
        res.send('error');
      } else {
        req.session.user = {};
        req.session.user.ssn = req.body.credential[0],
        req.session.user.nom = req.body.credential[3];
        req.session.user.prenom = req.body.credential[4];
        req.session.user.type = 'Patient';

        res.status(200).send('ok');
      }
    });
  } else
    return res.send({'status': 'no type provided'});
};

exports.DestroySession = (req, res) => {
  req.session.destroy((err) => {
    if (err)
      res.send('error');
    else
      res.status(200).send('ok');
  })
}

exports.CreateConsultation = (req, res) => {
  var errInsert; // grab the response from the model

  MainModel.newConsultation(req.body.data, (errInsert) => {
    if (errInsert) {
      console.log(errInsert);
      res.send('error');
    } else
      res.send('ok');
  });
};

exports.Consultation = (req, res) => {
  if (!req.session.user)
    return res.redirect('/');

  var type = req.session.user.type,
      dataSent = [],
      data;

  if (type === 'Médecin')
    dataSent.push('medecinId', req.session.user.medecinid);
  else if (type === 'Secrétaire')
    dataSent.push('phoneNoS', req.session.user.phonenos);
  else if (type === 'Patient')
    dataSent.push('SSN', req.session.user.ssn);
  else
    res.redirect('/');

  console.log(dataSent);

  MainModel.getConsultations(dataSent, (data) => {
    console.log(data);
    var result = {};
    result['data'] = data;
    result['type'] = type;
    result['count'] = data.length;
	if (result.data.length > 0) {
    result.data[0]['prenom'] = req.session.user.prenom;
    result.data[0]['nom'] = req.session.user.nom;
	} else {
		result.prenom = req.session.user.prenom;
		result.nom = req.session.user.nom;
		console.log(result);
	}
    res.render('Consultation', result);
  });
};

exports.ModifyObjet = (req, res) => {
  var errUpdate,
      userData = req.body.data;

  MainModel.updateObjet(userData, (errUpdate) => {
    if (errUpdate) {
      console.log(errUpdate);
      res.send('error');
    } else
      res.send('ok');
  });
};

exports.ConsultationPrescription = (req, res) => {
  var data;

  MainModel.getConsultationPrescription(req.body.data, (data) => {
    console.log(data);
    if (Object.keys(data).length === 0)
      res.send('error');
    else {
      res.send(data);
    }
  });
};
