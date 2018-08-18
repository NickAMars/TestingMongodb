const assert = require('assert');
const request = require('supertest');
const app = require('../app');

// document for supertest
// https://www.npmjs.com/package/supertest
describe('The express app', ()=>{
  it('handles a Get request to /api',  () => {
    // fake it
    request(app)
    .get('/api')
    .set('Accept', 'application/json')
    .end((err, res)=>{
      // console.log(res);
      assert(res.body.hi === 'there');
    });


  });
});
