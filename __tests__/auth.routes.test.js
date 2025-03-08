import request from 'supertest';
import * as chai from 'chai'; 
const expect = chai.expect; 
import { app, server } from "../server.js";
describe('GET /', () => {
  after(() => {
    server.close(); 
    console.log("Server close.")
  });
  it('should return an error with an invalid token', async () => {
    const response = await request(app)
      .get('/api')
      .set('Authorization', 'Bearer invalid-token') 
      .expect(401); 
    expect(response.body.error).to.equal('Invalid or expired token');
  });
});
