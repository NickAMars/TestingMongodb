const Controller = require(`../controllers`);
module.exports = (app)=> {
  app.get(`/api`,Controller.greeting);
  app.post('/api/drivers',Controller.create);
  app.put('/api/drivers/:id',Controller.edit);
  app.delete('/api/drivers/:id',Controller.delete);
}
