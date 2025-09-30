const request = require('supertest');
const app = require('../server');

describe('TrossApp Backend API', () => {
  describe('GET /api/health', () => {
    test('should return health status', async () => {
      const response = await request(app)
        .get('/api/health')
        .expect(200);

      expect(response.body).toHaveProperty('status', 'healthy');
      expect(response.body).toHaveProperty('service', 'TrossApp Backend');
      expect(response.body).toHaveProperty('timestamp');
      expect(new Date(response.body.timestamp)).toBeInstanceOf(Date);
    });

    test('should return JSON content type', async () => {
      const response = await request(app)
        .get('/api/health')
        .expect('Content-Type', /json/);
    });

    test('should respond quickly', async () => {
      const startTime = Date.now();
      await request(app)
        .get('/api/health')
        .expect(200);
      const endTime = Date.now();
      
      expect(endTime - startTime).toBeLessThan(1000);
    });
  });

  describe('GET /api/hello', () => {
    test('should return Hello World message', async () => {
      const response = await request(app)
        .get('/api/hello')
        .expect(200);

      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toContain('Hello, World!');
      expect(response.body).toHaveProperty('timestamp');
      expect(response.body).toHaveProperty('source', 'TrossApp Backend API');
    });

    test('should log "Hello, World!" to console', async () => {
      // Spy on console.log to verify our server logs the message
      const consoleSpy = jest.spyOn(console, 'log');
      
      await request(app)
        .get('/api/hello')
        .expect(200);

      expect(consoleSpy).toHaveBeenCalledWith('🎉 Hello, World! request received from frontend');
      
      consoleSpy.mockRestore();
    });

    test('should include CORS headers', async () => {
      const response = await request(app)
        .get('/api/hello')
        .set('Origin', 'http://localhost:8080') // Set origin to match CORS config
        .expect(200);

      expect(response.headers['access-control-allow-origin']).toBe('http://localhost:8080');
    });

    test('should handle concurrent requests', async () => {
      const requests = Array(5).fill().map(() => 
        request(app).get('/api/hello').expect(200)
      );
      
      const responses = await Promise.all(requests);
      
      responses.forEach(response => {
        expect(response.body.message).toContain('Hello, World!');
      });
    });
  });

  describe('CORS and Security', () => {
    test('should handle OPTIONS preflight requests', async () => {
      await request(app)
        .options('/api/hello')
        .set('Origin', 'http://localhost:8080')
        .expect(204); // OPTIONS typically returns 204 No Content
    });

    test('should include proper CORS headers', async () => {
      const response = await request(app)
        .get('/api/health')
        .set('Origin', 'http://localhost:8080')
        .expect(200);

      expect(response.headers['access-control-allow-origin']).toBe('http://localhost:8080');
    });
  });

  describe('Error Handling', () => {
    test('should return 404 for unknown endpoints', async () => {
      const response = await request(app)
        .get('/api/nonexistent')
        .expect(404);

      expect(response.body).toHaveProperty('error');
      expect(response.body).toHaveProperty('path', '/api/nonexistent');
    });

    test('should return 404 for root path', async () => {
      await request(app)
        .get('/')
        .expect(404);
    });

    test('should handle invalid HTTP methods gracefully', async () => {
      await request(app)
        .patch('/api/hello')
        .expect(404);
    });
  });

  describe('Work Order API (Future)', () => {
    test('should be prepared for work order endpoints', async () => {
      // This test documents our planned API structure
      const response = await request(app)
        .get('/api/v1/workorders')
        .expect(404); // Should be 404 until we implement it

      // This test will change when we implement work orders
      expect(response.status).toBe(404);
    });

    test('should handle future POST requests structure', async () => {
      await request(app)
        .post('/api/future-endpoint')
        .send({ test: 'data' })
        .expect(404);
    });
  });

  describe('Performance and Reliability', () => {
    test('should handle rapid successive requests', async () => {
      const requests = Array(10).fill().map(() => 
        request(app).get('/api/health').expect(200)
      );
      
      const responses = await Promise.all(requests);
      expect(responses).toHaveLength(10);
    });

    test('should maintain consistent response format', async () => {
      const responses = await Promise.all([
        request(app).get('/api/health'),
        request(app).get('/api/hello'),
      ]);
      
      responses.forEach(response => {
        expect(response.body).toHaveProperty('timestamp');
        expect(response.headers['content-type']).toMatch(/application\/json/);
      });
    });
  });
});