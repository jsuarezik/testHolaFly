const { planetFactory } = require("../Planet");
const { getRandomNumber } = require("../utils");

class PlanetService {

    constructor(app) {
        this.app = app;
    }

    async getPlanetById(id) {
        const planet = await this.app.db.swPlanet.findOne({where : {id: id}})
        if (planet) {
            return await planetFactory(planet);
        } else {
            const data = await this.getPlanetFromAPI(id);
            if (!data.hasOwnProperty('detail')) {
                return await planetFactory(data);
            } 
        }

        return null;
    }

    async getPlanetFromAPI(id) {
        return this.app.swapiFunctions.genericRequest(`https://swapi.dev/api/planets/${id}`, 'GET', null, false);
    }

    async getRandomPlanet() {
        const randomValidId = getRandomNumber(1, 60);
        return this.getPlanetById(randomValidId);
    }
    
}

module.exports = PlanetService