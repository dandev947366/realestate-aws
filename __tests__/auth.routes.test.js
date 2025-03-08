import request from 'supertest';
import { app } from "../server.js"; 
import * as chai from 'chai'; 
const expect = chai.expect; 

describe('GET /', () => {
  after(() => {
    app.close(); // Ensure the server stops after the test
  });
  it('should return an error with an invalid token', async () => {
    const response = await request(app)
      .get('/api')
      .set('Authorization', 'Bearer invalid-token') 
      .expect(401); 
    expect(response.body.error).to.equal('Invalid or expired token');
  });
});
