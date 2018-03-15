const rp = require('request-promise');

const base_uri = 'http://127.0.0.1:9000/api/proxies';

describe('test proxy api', () => {
  test('it should be 200 with default params', (limit = 10, page = 0, done) => {
    rp({uri: base_uri, json: true})
      .then((result) => {
        expect(result.code).toEqual(200);
        expect(result.data.rows.length).toEqual(limit);
        expect(result.data.page).toEqual(page);
        done();
      })
  })

  test(`it should be 200 with only correct limit`, (limit = 20, page = 0, done) => {
    rp({uri: `${base_uri}?limit=${limit}`, json: true})
      .then((result) => {
        expect(result.code).toEqual(200);
        expect(result.data.rows.length).toBeLessThanOrEqual(limit);
        expect(result.data.page).toEqual(page);
        done();
      })
  })

  test(`it should be 200 with only correct page`, (limit = 10, page = 3, done) => {
    rp({uri: `${base_uri}?page=${page}`, json: true})
      .then((result) => {
        expect(result.code).toEqual(200);
        expect(result.data.rows.length).toBeLessThanOrEqual(limit);
        expect(result.data.page).toEqual(page);
        done();
      })
  })

  test(`it should be 200 with correct limit and page `, (limit = 6, page = 3, done) => {
    rp({uri: `${base_uri}?limit=${limit}&page=${page}`, json: true})
      .then((result) => {
        expect(result.code).toEqual(200);
        expect(result.data.rows.length).toBeLessThanOrEqual(limit);
        expect(result.data.page).toEqual(page);
        done();
      })
  })

  test(`it should be 200 with incorrect limit and correct page`, (limit = -10, page = 0, done) => {
    rp({uri: `${base_uri}?limit=${limit}&page=${page}`, json: true})
      .then((result) => {
        expect(result.code).toEqual(200);
        expect(result.data.rows.length).toBeLessThanOrEqual(10);
        expect(result.data.page).toEqual(page);
        done();
      })
  })

  test(`it should be 200 with incorrect page and correct limit `, (limit = 6, page = -3, done) => {
    rp({uri: `${base_uri}?limit=${limit}&page=${page}`, json: true})
      .then((result) => {
        expect(result.code).toEqual(200);
        expect(result.data.rows.length).toBeLessThanOrEqual(limit);
        expect(result.data.page).toEqual(0);
        done();
      })
  })

  test(`it should be 200 with incorrect page and incorrect limit `, (limit = -6, page = -3, done) => {
    rp({uri: `${base_uri}?limit=${limit}&page=${page}`, json: true})
      .then((result) => {
        expect(result.code).toEqual(200);
        expect(result.data.rows.length).toBeLessThanOrEqual(10);
        expect(result.data.page).toEqual(0);
        done();
      })
  })

})