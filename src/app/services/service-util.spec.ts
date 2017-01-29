/* tslint:disable:no-unused-variable */

import { ServiceUtil } from './service-util';

describe('ServiceUtil', () => {

  beforeEach(() => {
    this.service = new ServiceUtil('http://www.example.com/api/');
  });

  describe('url()', () => {

    it('should return a URL with the base path', () => {
      expect(this.service.url()).toEqual('http://www.example.com/api/');
    });

    it('should return a URL with the specified path', () => {
      expect(this.service.url('foo/bar')).toEqual('http://www.example.com/api/foo/bar');
    });

    it('should return a URL with the specified query parameters', () => {
      expect(this.service.url('', { a: 1, b: 'foo' })).toEqual('http://www.example.com/api/?a=1&b=foo');
    });

    it('should return a URL with several of the same query parameter', () => {
      expect(this.service.url('', { a: 1, b: ['foo', 'bar'] })).toEqual('http://www.example.com/api/?a=1&b=foo&b=bar');
    });

    it('should return a URL with a path and query parameters', () => {
      expect(this.service.url('foo/bar', { a: 1, b: ['foo', 'bar'] })).toEqual('http://www.example.com/api/foo/bar?a=1&b=foo&b=bar');
    });

  });
});
