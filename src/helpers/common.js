export const createUrlParams = (options, keys) => keys
  .map(key => `${key}=${options[key]}`)
  .join('&');

export const parserUrlParams = (query= '') => query
  .split('&')
  .map(chunk => chunk.split('='))
  .reduce((options, chunk=[]) => ({ ...options, [chunk[0]]: chunk[1] }), {})