exports.Index = (req, res) => {
  if (req.session.name)
    res.render('Index');
  else {
    res.redirect('/login');
  }
};

exports.Login = (req, res) => {
  res.info = {};
  res.info.name = req.session.name ?
                    req.session.name:
                    '';

  res.status(300).render('Login', res.info);
}

exports.Sub = (req, res) => {
  res.render('Sub');
}
