const assert = require('assert');

let fetch;

describe('User API Tests', function () {
  before(async function () {
    fetch = (await import('node-fetch')).default;
  });

  let baseUrl = 'http://localhost:8000/api/user';
  let token;

  let email = `alice-${Math.random()}@example.com`;
  describe('POST /register', function () {
    it('should register a user', async function () {
        
      const userData = {
        name: 'Alice Johnson',
        email: email,
        password: 'password123'
      };
      const response = await fetch(`${baseUrl}/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });

      assert.strictEqual(response.status, 201);
      const result = await response.json();
      assert.strictEqual(result.user.email, userData.email);
      token = result.tokens.access.token; // Assuming token structure
    });
  });

  let userId;
  describe('POST /login', function () {
    it('should login user and return a token', async function () {
      const userData = {
        email: email,
        password: 'password123'
      };

      const response = await fetch(`${baseUrl}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });

      assert.strictEqual(response.status, 200);
      const result = await response.json();
      assert.strictEqual(result.user.email, userData.email);
      token = result.tokens.access.token;
      userId = result.user._id;
    });
  });

  describe('GET /users/:userId', function () {
    it('should fetch user details', async function () {
    //   const userId = userId; 
      const response = await fetch(`${baseUrl}/users/${userId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      assert.strictEqual(response.status, 200);
      const result = await response.json();
      assert.strictEqual(result.name, 'Alice Johnson');
    });
  });

});
