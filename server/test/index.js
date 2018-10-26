import http from 'http';
import assert from 'assert';

import '../src/index.js';

describe('Test server', () => {
  it('Returns 200', done => {
    http.get('http://localhost:5000', res => {
      assert.equal(200, res.statusCode);
      done();
    });
  });
});