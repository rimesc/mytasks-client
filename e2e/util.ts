import { promise } from 'protractor';
import { post } from 'request';

export function resetData() {
  let defer = promise.defer();
  post('http://localhost:8080/api/dev/reset', (error, response, body) => {
    if (error) {
      defer.reject(error);
    } else if (response.statusCode !== 200) {
      defer.reject('Failed to reset data: POST returned status ' + response.statusCode);
    } else {
      defer.fulfill();
    }
  });
}
