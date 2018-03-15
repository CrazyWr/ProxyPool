import rp from 'request-promise';
import {testProxy, verifyProxyFormat} from "../../app/extend/helper";

describe('test helper testProxy', () => {
  var proxy = '';
  beforeAll(async () => {
    const result = await rp({uri: 'http://127.0.0.1:9000/api/proxies', json:true});
    const rows = result.data.rows;
    if (rows.length > 0) proxy = rows[0].proxy;
  })

  test('test testProxy with correct proxy ', () => {
    testProxy(proxy)
      .then((result) => {
        expect(result.status).toEqual(true);
        expect(result.delay).toGreatThanOrEqual(0);
      })
  })

  test('test testProxy with incorrect proxy ', () => {
    testProxy('12.45.75.1')
      .then((result) => {
        expect(result.status).toEqual(false);
        expect(result.delay).toGreatThanOrEqual(0);
      })
  })

  test('test testProxy with null string proxy ', () => {
    testProxy('')
      .then((result) => {
        expect(result.status).toEqual(false);
        expect(result.delay).toGreatThanOrEqual(0);
      })
  })

  test('test testProxy with null string proxy ', () => {
    testProxy()
      .then((result) => {
        expect(result.status).toEqual(false);
        expect(result.delay).toGreatThanOrEqual(0);
      })
  })
})

describe('test helper verifyProxyFormat', () => {

  test('test verifyProxyFormat with correct proxy ', () => {
    expect(verifyProxyFormat('123.34.56.92:80')).toBe(true)
  })

  test('test verifyProxyFormat with incorrect proxy ', () => {
    expect(verifyProxyFormat('123.34.56.92')).toBe(false)
  })

  test('test verifyProxyFormat with null string proxy ', () => {
    expect(verifyProxyFormat('')).toBe(false);
  })

  test('test verifyProxyFormat without proxy ', () => {
    expect(verifyProxyFormat()).toBe(false);
  })
})