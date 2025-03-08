import request from 'supertest';
import * as chai from 'chai'; 
const expect = chai.expect; 
import { app, server } from "../server.js";
describe('GET /', () => {
  after(async () => {
    await server.close(); 
    await mongoose.disconnect();
    console.log("Server close. DB disconnected.")
  });
  it('should return an error with an invalid token', async () => {
    const response = await request(app)
      .get('/api')
      .set('Authorization', 'Bearer invalid-token') 
      .expect(401); 
    expect(response.body.error).to.equal('Invalid or expired token');
  });
});
