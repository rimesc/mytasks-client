export interface Error {
  code: string;
  message: string;
}

export function isError(error: any): error is Error {
  return error.hasOwnProperty('code') && error.hasOwnProperty('message');
}