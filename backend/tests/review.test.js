const assert = require('assert');

let fetch;

describe('Review API Tests', function () {
  before(async function () {
    fetch = (await import('node-fetch')).default;
  });

  let baseUrl = 'http://localhost:8000/api/reviews';
  let token, reviewId, userId, movieId;

    describe('POST /login', function () {
    it('should login user', async function () {
        const baseUrl = 'http://localhost:8000/api/user/login';
        const userData = {
        email: 'usman@gmail.com'    ,
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

    //get movies by user
    describe('GET /movies', function () {
        it('should get all movies', async function () {
        const baseUrl = 'http://localhost:8000/api/movies/user';
        const response = await fetch(baseUrl,
        {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        assert.strictEqual(response.status, 200);
        const result = await response.json();
        totalResults = result.totalResults;
        });
    });


  describe('POST /reviews/', function () {
    it('should add a new review', async function () {
      const reviewData = {
        movieId: movieId,
        stars: 5,
        description: 'Great movie!'
      };

      const response = await fetch(`${baseUrl}/`, {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${token}`, 
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify(reviewData)
      });

      assert.strictEqual(response.status, 201);
      const result = await response.json();
      assert.strictEqual(result.stars, reviewData.stars);
      assert.strictEqual(result.description, reviewData.description);
      reviewId = result._id; // Save review id for later use
    });
  });

  describe('GET /reviews/:reviewId', function () {
    it('should get a review by id', async function () {
      const response = await fetch(`${baseUrl}/${reviewId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      assert.strictEqual(response.status, 200);
      const result = await response.json();
      assert.strictEqual(result._id, reviewId);
    });
  });

  describe('PATCH /reviews/:reviewId', function () {
    it('should update the review', async function () {
      const updatedData = {
        stars: 4,
        description: 'Actually, it was pretty good, but not perfect.'
      };

      const response = await fetch(`${baseUrl}/${reviewId}`, {
        method: 'PATCH',
        headers: { 
          'Authorization': `Bearer ${token}`, 
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedData)
      });

      assert.strictEqual(response.status, 200);
      const result = await response.json();
      assert.strictEqual(result.description, updatedData.description);
    });
  });

  describe('DELETE /reviews/:reviewId', function () {
    it('should delete the review', async function () {
      const response = await fetch(`${baseUrl}/${reviewId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      assert.strictEqual(response.status, 204);
    });
  });

});

