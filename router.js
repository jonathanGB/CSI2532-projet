var Controller = require('./controllers/MainController');

module.exports = function(app) {
  app
  .get('/', Controller.Index)
  .get('/login', Controller.Login)
  .get('/register', Controller.Register)
  .get('/logout', Controller.Logout)
  .post('/login', Controller.ValidateLogin)
  .post('/register', Controller.ValidateRegister)
  .delete('/logout', Controller.DestroySession)
}
