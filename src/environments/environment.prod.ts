// The file 'secret.ts' contains encrypted auth0 credentials. To use your own credentials,
// delete this import and enter your credentials below.
import { secret } from './secret';

export const environment = {
  production: true,
  authClient: secret.authClient,
  authDomain: secret.authDomain,
  authCallback: secret.authCallback,
  apiBase: secret.apiBase
};
