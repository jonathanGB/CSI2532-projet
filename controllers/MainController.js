var Model = require('../models/MainModel');

exports.Index = (req, res) => {
  Model.hello();
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
