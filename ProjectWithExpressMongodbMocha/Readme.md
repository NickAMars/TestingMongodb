
//res.body
recieves object send from the controler in res.send({})


//test
dirName -- ./test/controller/drivers_controller_test.js
  request(app)
  .post('/api/drivers')
  // send information to the server
  .send({email: 'test@test.com'})
  .end( async (err,res)=>{
    \*
     res.body
     recieves object send from the controller in res.send({})
    \*
    const Newdriver = await Driver.count();
    assert(drivers + 1 === Newdriver);
  });
