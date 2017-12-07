import request from 'request';
import log from './logger';

const errorStatus = error => (error && error.statusCode ? error.statusCode : null);

const responseStatus = res => (res && res.statusCode ? res.statusCode : null);

const getResponseStatus = (error, response) => {
  const eStatus = errorStatus(error);
  const rStatus = responseStatus(response);

  let status;

  if (eStatus) {
    status = eStatus;
  } else if (rStatus) {
    status = rStatus;
  } else {
    status = 502;
  }

  return status;
};

const stringifyIfExists = obj => (obj ? JSON.stringify(obj) : '');

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
      const status = getResponseStatus(error, response);

      const errorString = stringifyIfExists(error);
      const responseString = stringifyIfExists(response);
      const bodyString = stringifyIfExists(responseBody);

      log.debug('POST Response', {
        status,
        error: errorString,
        res: responseString,
        body: bodyString,
      });

      if (status >= 200 && status < 400) {
        resolve({ status, res: responseString, body: bodyString });
      } else {
        reject({ status, err: errorString, res: responseString, body: bodyString });
      }
    });
  });

export default {
  post,
};
