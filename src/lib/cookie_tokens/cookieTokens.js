const { v4: uuidv4 } = require('uuid');
const config = require('config');
const CookieConfig = config.get('Cookies');

const getCookieToken = (headerCookies) => {
  let cookies = [];
  if (headerCookies) {
    const appCookiesList = headerCookies.split('; ');

    let cookieChunck;
    const cookieItems = appCookiesList.map((item) => {
      cookieChunck = item.split('=');

      return {
        name: cookieChunck[0],
        value: cookieChunck[1],
      };
    });

    if (cookieItems.length > 0) {
      cookies = cookieItems;
    }
  }
  return cookies;
};

const cookieTokenHandler = (req, res, next) => {
  const headerCookies = req.headers.cookie || null;

  const { cookieName, expiryDate, httpOnly, secure } = CookieConfig.GuestToken;

  const cookies = factory.getCookieToken(headerCookies);

  if (cookies.length === 0) {
    // Cookie Token
    const cookieToken = uuidv4();

    res.clearCookie(cookieName);
    res.cookie(cookieName, cookieToken, {
      maxAge: Number(expiryDate),
      httpOnly: Boolean(httpOnly),
      secure: Boolean(secure),
    });
  }

  req.app.locals.cookieTokens = cookies;
  next();
};

const factory = {
  getCookieToken,
  cookieTokenHandler,
};
module.exports = factory;
