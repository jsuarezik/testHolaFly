const Planet = require('./Planet');

const planetFactory = async model => {
    return new Planet(model);
}

module.exports = { planetFactory }