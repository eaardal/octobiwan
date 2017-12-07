import request from 'request';
import log from './logger';

const post = async (url, body) =>
  new Promise((resolve, reject) => {
    const headers = {
      'Content-Type': 'application/json',
    };

    const options = {
      url,
      headers,
      method: 'POST',
      body,
    };

    log.debug('Making POST request', options);

    request(options, (error, response /* , body */) => {
      if (!error && response.statusCode === 200) {
        resolve({ status: 200 });
      } else {
        reject({ status: 502, error });
      }
    });
  });

export default {
  post,
};
