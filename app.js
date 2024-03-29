const express = require('express'),
      http    = require('http'),
      path = require('path'),
      handlebars = require('express-handlebars'),
      bodyParser = require('body-parser'),
      expressSession = require('express-session'),
      cookieParser = require('cookie-parser');

var app = express(),
    hbs = handlebars.create({
      defaultLayout: 'main',
      helpers: {
        prevQuery: (title) => {
          console.log(title);
          var curr = title.split(' ');
          return parseInt(curr[1]) - 1;
        },
        nextQuery: (title) => {
          console.log(title);
          var curr = title.split(' ');
          return parseInt(curr[1]) + 1;
        },
        formatIfDate: (elem) => {
          new Date(elem).toGMTString().search(/(\w+ \w+ \w+)/);
          return RegExp.$1;
        },
        neq: function(i, j, block) {
          if (i != j)
            return block.fn(this);
        },
        eq: function(i, j, block) {
          if (i == j)
            return block.fn(this);
        }
      }
    })

app.set('port', 5000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(expressSession({
  secret: 'csi2532-secret-cookie',
  resave: false,
  saveUninitialized: false,
  secure: false
}));
app.use(bodyParser.urlencoded({
  extended: true
}));

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

require('./router')(app);
