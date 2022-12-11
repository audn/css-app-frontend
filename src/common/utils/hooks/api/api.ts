const base = process.env.NEXT_PUBLIC_API_URL;

async function get(endpoint: string, requireAuth: boolean, headers?: object) {
  return request(endpoint, 'GET', requireAuth, undefined, headers);
}
async function post(endpoint: string, requireAuth: boolean, body?: object) {
  return request(endpoint, 'POST', requireAuth, body, undefined);
}
async function del(endpoint: string, requireAuth: boolean, body?: object) {
  return request(endpoint, 'DELETE', requireAuth, body, undefined);
}

async function put(endpoint: string, requireAuth: boolean, body?: object) {
  return request(endpoint, 'PUT', requireAuth, body, undefined);
}

async function request(
  endpoint: string,
  method: string,
  requireAuth: boolean,
  body?: object,
  existingHeaders?: object,
) {
  let options: RequestInit = {
    method: method,
    mode: 'cors',
    referrerPolicy: 'no-referrer',
    credentials: requireAuth ? 'include' : 'omit',
  };
  console.log('getting data for url ', `${base}${endpoint}`);

  const headers: HeadersInit = new Headers(
    Object.entries(existingHeaders || {}),
  );

  if (body !== undefined) {
    options.body = JSON.stringify(body);
    headers.set('Content-Type', 'application/json');
  }

  options.headers = headers;

  const res = await fetch(`${base}${endpoint}`, options);

  return res;
}
async function sendImage(
  endpoint: string,
  requireAuth: boolean,
  buffer: Buffer,
) {
  let options: RequestInit = {
    method: 'PUT',
    mode: 'cors',
    referrerPolicy: 'no-referrer',
    credentials: requireAuth ? 'include' : 'omit',
  };

  const headers: HeadersInit = new Headers();

  headers.set('content-type', 'image/png');

  options.headers = headers;
  options.body = buffer;

  console.log(options);

  return fetch(`${base}${endpoint}`, options);
}
export { request, get, post, del, put, sendImage };
