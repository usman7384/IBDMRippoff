const assert = require('assert');

let fetch;

describe('Movie Management', function () {
  before(async function () {
    fetch = (await import('node-fetch')).default;
  });

let token;
    describe('POST /login', function () {
    it('should login user', async function () {
      const baseUrl = 'http://localhost:8000/api/user/login';
      const userData = {
        email: 'usman@gmail.com',
        password: 'password123'
        };
        const response = await fetch(baseUrl, {

        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
        });
        assert.strictEqual(response.status, 200);
        const result = await response.json();
        assert.strictEqual(result.user.email, userData.email);
        token = result.tokens.access.token;
    }
    );
    }
    );

    let totalResults;
    describe('GET /movies', function () {
        it('should get all movies', async function () {
        const baseUrl = 'http://localhost:8000/api/movies/';
        const response = await fetch(baseUrl);
        assert.strictEqual(response.status, 200);
        const result = await response.json();
        assert.ok(result.totalResults, 1);
        totalResults = result.totalResults;
        });
    });

    let movieId;
  describe('POST /movies', function () {
    it('should create a new movie', async function () {
      const baseUrl = 'http://localhost:8000/api/movies/';
      const movieData = {
        // generate a random name to avoid conflicts
        name: `Inception-${Math.random()}`,
        genere: 'Action',
        rating: 9,
        description: 'A thriller about dream invaders.'
      };

      const response = await fetch(baseUrl, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(movieData)
      });

      assert.strictEqual(response.status, 201);
      const result = await response.json();
      assert.strictEqual(result.name, movieData.name);
      movieId = result._id;
    });
  });

    describe('GET /movies', function () {
        it('should get all movies plus the one we created', async function () {
        const baseUrl = 'http://localhost:8000/api/movies/';
        const response = await fetch(baseUrl);
        assert.strictEqual(response.status, 200);
        const result = await response.json();
        assert.strictEqual(result.totalResults, totalResults + 1);
        });
    });

    describe('GET /movies/:movieId', function () {
        it('should get the movie we created latest', async function () {
        const baseUrl = 'http://localhost:8000/api/movies/';
        const response = await fetch(`${baseUrl}${movieId}`);
        assert.strictEqual(response.status, 200);
        });
    });

    describe('PATCH /movies/:movieId', function () {
        it('should update the movie we created', async function () {
        const baseUrl = `http://localhost:8000/api/movies/${movieId}`;
        const movieData = {
            name: `Inception-${Math.random()}`,
            genere: 'Action',
            rating: 9,
            description: 'A thriller about dream invaders.'
        };

        const response = await fetch(baseUrl, {
            method: 'PATCH',
            headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
            body: JSON.stringify(movieData)
        });

        assert.strictEqual(response.status, 200);
        const result = await response.json();
        assert.strictEqual(result.name, movieData.name);
        });
    });

});
