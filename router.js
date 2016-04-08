var Controller = require('./controllers/MainController');

module.exports = function(app) {
  app
  .get('/', Controller.Index)
  .get('/sub', Controller.Sub);
}
