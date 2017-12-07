import request from 'request';

const post = (url, body) =>
  new Promise((resolve, reject) => {
    const headers = {
      'Content-Type': 'application/json',
    };

    const options = {
      url,
      headers,
      method: 'POST',
      form: body,
    };

    request(options, (error, response /* , body */) => {
      if (!error && response.statusCode === 200) {
        resolve({ status: 200 });
      } else {
        reject(error);
      }
    });
  });

export default {
  post,
};
