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

    request(options, (error, response, responseBody) => {
      log.debug('POST Response', { error, response, body: responseBody });

      const status = response && response.statusCode ? response.statusCode : 502;

      if (status >= 200 && status < 400) {
        resolve({ status, response });
      } else {
        reject({ status, error, response });
      }
    });
  });

export default {
  post,
};
