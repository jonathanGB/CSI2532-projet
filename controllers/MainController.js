var Model = require('../models/MainModel');

exports.Index = (req, res) => {
  if (req.session.user)
    res.render('Index', req.session.user);
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
    Model.isMedecin(req.body.credential, (data) => {
      if (data.length > 0) {
        req.session.user = data[0];
        req.session.user.type = 'Médecin';
        return res.status(200).send('ok');
      } else
        return res.send('error');
    });
  } else if (type === 'secretaire') {
    Model.isSecretaire(req.body.credential, (data) => {
      if (data.length > 0) {
        req.session.user = data[0];
        req.session.user.type = 'Secrétaire';
        return res.status(200).send('ok');
      } else
        return res.send('error');
    });
  } else if (type === 'patient') {
    Model.isPatient(req.body.credential, (data) => {
      if (data.length > 0) {
        req.session.user = data[0];
        req.session.user.type = 'Patient';
        return res.status(200).send('ok');
      } else
        return res.send('error');
    });
  } else
    return res.status(403).send({'status': 'no type provided'});
}

exports.ValidateRegister = (req, res) => {
  var errInsert; // grab the response from the model
  var type = req.body.type;

  console.log(req.body.credential);

  if (type === 'medecin') {
    Model.insertMedecin(req.body.credential, (errInsert) => {
      if (errInsert){
        console.log(errInsert);
        res.status(403).send('error');
      } else {
        req.session.user = {};
        req.session.user.medecinId = req.body.credential[0];
        req.session.user.nom = req.body.credential[2];
        req.session.user.prenom = req.body.credential[3];
        req.session.user.type = 'Médecin';

        res.status(200).send('ok');
      }
    });
  } else if (type === 'secretaire') {
    Model.insertSecretaire(req.body.credential, (errInsert) => {
      if (errInsert){
        console.log(errInsert);
        res.status(403).send('error');
      } else {
        req.session.user = {};
        req.session.user.phoneNoS = req.body.credential[0];
        req.session.user.nom = req.body.credential[1];
        req.session.user.prenom = req.body.credential[2];
        req.session.user.type = 'Secrétaire';

        console.log(req.session.user);
        res.status(200).send('ok');
      }
    });
  } else if (type === 'patient') {
    Model.insertPatient(req.body.credential, (errInsert) => {
      if (errInsert){
        console.log(errInsert);
        res.status(403).send('error');
      } else {
        req.session.user = {};
        req.session.user.SSN = req.body.credential[0],
        req.session.user.nom = req.body.credential[3];
        req.session.user.prenom = req.body.credential[4];
        req.session.user.type = 'Patient';

        res.status(200).send('ok');
      }
    });
  } else
    return res.status(403).send({'status': 'no type provided'});
};

exports.DestroySession = (req, res) => {
  req.session.destroy((err) => {
    if (err)
      res.status(500).send('error');
    else
      res.status(200).send('ok');
  })
}
