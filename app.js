const express = require('express'),
      http    = require('http'),
      path = require('path'),
      handlebars = require('express-handlebars');

var app = express(),
    hbs = handlebars.create({
      defaultLayout: 'main'
    });

app.set('port', 5000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, 'static')));

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

require('./router')(app);
