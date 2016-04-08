const express = require('express'),
      http    = require('http'),
      path = require('path'),
      handlebars = require('express-handlebars'),
      pg = require('pg');

var app = express(),
    hbs = handlebars.create({
      defaultLayout: 'main'
    }),
    conString = 'postgres://postgres:root@localhost:5432/projet-csi2532';

app.set('port', 5000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, 'static')));

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

require('./router')(app);

pg.connect(conString, (err, client, done) => {
  if (err)
    return console.error('error fetching client from pool', err);

  client.query('INSERT INTO Secretaire VALUES($1, $2, $3, $4)', ["819-543-0112", "gui", "jon", "10 impasse nebuleuse"], (err) => {
    if (err)
      console.log('erreur insertion', err);
    else {
      console.log('success insertion');
    }

    done();
  });
});
