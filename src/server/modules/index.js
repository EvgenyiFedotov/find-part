import auth from './auth';

export function cookiesByUrl(req, res, next) {
  let url = req.originalUrl;
  const cookiesDecode = Object.keys(req.cookies)
    .reduce((result, key) => ({
      ...result,
      [decodeURIComponent(key)]: req.cookies[key],
    }), {});

  url = url === '/' ? '/auth' : url;

  req.cookiesByUrl = JSON.parse(cookiesDecode[url] || null);

  next();
}

export default {
  auth,
};
