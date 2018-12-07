const parseCookies = (req, res, next) => {

    if (req.headers.cookie) {
        let tempArr = req.headers.cookie.split('; ');
        let cookieObj = {};
        let cookieID;
        let cookieHash;
        tempArr.forEach((cookie) => {
            let splitCookie = cookie.split('=')
            cookieID = splitCookie[0];
            cookieHash = splitCookie[1];
            cookieObj[cookieID] = cookieHash;
        })
        req.cookies= cookieObj;
        next();
    }
};

module.exports = parseCookies;