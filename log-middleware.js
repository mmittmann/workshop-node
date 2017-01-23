module.exports = (req, res, next) => {
    console.log('Requisição feita em ' + req.url);
    next();
}