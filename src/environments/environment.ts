// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
  production: false,
  apiBase: 'http://localhost:8080/api/',
  authClient: '_fill_in_client_id_here_',
  authDomain: '_fill_in_auth_domain_here_'
  authCallback: 'http://localhost:4200'
};
