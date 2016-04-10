var Controller = require('./controllers/MainController');

module.exports = function(app) {
  app
  .get('/', Controller.Index)
  .get('/login', Controller.Login)
  .get('/sub', Controller.Sub);
}
