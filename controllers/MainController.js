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

  } else if (type === 'secretaire') {
    Model.isSecretaire(req.body.credential, (data) => {
      if (data.length > 0) {
        req.session.user = data[0];
        req.session.user.type = 'secretaire';
        return res.status(200).send('ok');
      } else
        return res.status(404).send('error');
    });
  } else if (type === 'patient') {

  } else
    return res.status(403).send({'status': 'no type provided'});
}

exports.DestroySession = (req, res) => {
  req.session.destroy((err) => {
    if (err)
      res.status(500).send('error');
    else
      res.status(200).send('ok');
  })
}
