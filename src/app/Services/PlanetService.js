const { planetFactory } = require("../Planet");

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
        return this.app.swapiFunctions.genericRequest(`https://swapi.dev./api/planets/${id}`, 'GET', null, true);
    }
    
}

module.exports = PlanetService