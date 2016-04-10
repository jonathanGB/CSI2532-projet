var Model = require('../models/MainModel');

exports.Index = (req, res) => {
  if (req.session.name)
    res.render('Index');
  else {
    res.redirect('/register');
  }
};

exports.Login = (req, res) => {
    if (req.session.name)
      res.redirect('/');
    else
      res.render('Login')
}

exports.Register = (req, res) => {
  if (req.session.name)
    res.redirect('/');
  else
    res.render('Register');
}

exports.Logout = (req, res) => {
  if (req.session.name)
    res.render('Logout');
  else
    res.redirect('/register');
}

exports.ValidateLogin = (req, res) => {
  var data; // grab the response from the model
  var type = req.body.type;

  if (type === 'Medecin') {

  } else if (type === 'Secretaire') {
    Model.isSecretaire((data) => {
      if (data.length > 0) {
        console.log(Object.keys(data).length === 0);
        return res.status(200).send(data);
        // create session, redirect to root
      } else
        return res.status(404).send('bad');
    });
  } else if (type === 'Patient') {

  } else
    return res.status(403).send({'status': 'no type provided'});
}
