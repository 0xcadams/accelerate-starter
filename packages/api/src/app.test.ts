import app from '../src/app';
import assert from 'assert';
import supertest from 'supertest';

describe('app.ts tests', () => {
  const port = app.get('port');

  let server;

  before((done) => {
    server = app.listen(port);
    server.once('listening', () => done());
  });

  after((done) => {
    server.close(done);
  });

  describe('404', () => {
    it('shows a 404 HTML page', async () => {
      const response = await supertest(server).get('/path/to/nowhere');
      assert.strictEqual(response.status, 404);
    });
  });
});
