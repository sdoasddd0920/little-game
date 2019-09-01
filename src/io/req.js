const baseUrl = 'http://www.qq.com';

const req = method => (url, data={}) => {
  const config = {
    ...data,
    mode: 'cors',
    method: method.toUpperCase() || 'GET',
    headers: {
      'content-type': 'application/json'
    }
  }
  return fetch(baseUrl+url, config).then(req => req.json().data);
}

export default req;
