var Controller = require('./controllers/MainController');
var QueryController = require('./controllers/QueryController');

module.exports = function(app) {
  app
  .get('/', Controller.Index)
  .get('/login', Controller.Login)
  .get('/register', Controller.Register)
  .get('/logout', Controller.Logout)
  .post('/login', Controller.ValidateLogin)
  .post('/register', Controller.ValidateRegister)
  .delete('/logout', Controller.DestroySession)
  .post('/createConsultation', Controller.CreateConsultation)
  .get('/consultation', Controller.Consultation)
  .post('/modifyObjet', Controller.ModifyObjet)

  .get('/api/query1', QueryController.Query1)
  .get('/api/query2', QueryController.Query2)
  .get('/api/query3', QueryController.Query3)
  .get('/api/query4', QueryController.Query4)
  .get('/api/query5', QueryController.Query5)
  .get('/api/query6', QueryController.Query6)
  .get('/api/query7', QueryController.Query7)
  .get('/api/query8', QueryController.Query8)
  .get('/api/query9', QueryController.Query9)
  .get('/api/query10', QueryController.Query10)
  .get('/api/query11', QueryController.Query11)
  .get('/api/query12', QueryController.Query12)
  .get('/api/query13', QueryController.Query13)
  .get('/api/query14', QueryController.Query14)
  .get('/api/query15', QueryController.Query15);
}
