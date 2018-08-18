const Driver = require('../models/driver');

module.exports ={
  greeting( req, res ){
    res.send({hi:'there'});
  },
  async create(req,res, next){
    const driverProps = req.body;
    try{
      const newDriver = await Driver.create(driverProps);
      res.send(newDriver);
    }catch(err){
     // dealing with the crashing of or server
     // goes to the next middle ware on the chain
      next(err);
    }
  },
  async edit(req, res, next){
    const driverId = req.params.id;
    const driverProps = req.body;
    try{/*set if feild does not exit will add on*/
      await Driver.findOneAndUpdate({ _id: driverId}, driverProps);
      const driver = Driver.findOne({_id: driverId});
      res.send(driver);
    }catch(err){
      next(err);
    }
  },
  async delete(req, res, next){
    const driverId = req.params.id;
    try{
      const driver = await Driver.findOneAndDelete({ _id: driverId});
      res.status(204).send(driver);
    }catch(err){
      next(err);
    }
  }
};
