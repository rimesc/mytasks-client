// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

// The file 'secret.ts' contains encrypted auth0 credentials. To use your own credentials,
// delete this import and enter your credentials below.
import { secret } from './secret';

export const environment = {
  production: false,
  authClient: secret.authClient,
  authDomain: secret.authDomain,
  authCallback: 'http://localhost:4200/login',
  apiBase: 'http://localhost:8080/api/'
};
