const loggingMiddleware = (db) =>
    (req, res, next) => {
        const ip = (req.headers['x-forwarded-for'] || req.connection.remoteAddress || '').split(',')[0].trim();
        const method = req.method;
        const headers = JSON.stringify(req.headers);
        const originalUrl = req.originalUrl;
        // Persist this info on DB
        db.logging.create( {
            action: `${method} ${originalUrl}`,
            header: headers,
            ip,
        })
        next();
    }

module.exports = loggingMiddleware;