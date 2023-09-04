const { peopleFactory } = require("../People");
const PlanetService = require("./PlanetService");

class PeopleService {

    constructor(app) {
        this.app = app;
        this.PlanetService = new PlanetService(app)
    }

    async getPeopleById(id, lang) {
        const people = await this.app.db.swPeople.findOne({where : {id: id}})
        if (people) {
            return await peopleFactory(people, lang);
        } else {
            const data = await this.getPeopleFromTheAPI(id);
            if (!data.hasOwnProperty('detail')) {
                //TODO Planet Service to get the planet name injected into the data OR work with associations TBD
                const planetId= data.homeworld.match(/\/(\d+)\//);
                if (planetId && planetId[1]) {
                    const planet = await this.PlanetService.getPlanetById(planetId);
                    if (planet) {
                        return await peopleFactory({... data, homeworld_name: planet.name }, lang);
                    }
                }
                return await peopleFactory(data, lang);
            } 
        }

        return null;
    }

    async getPeopleFromTheAPI(id) {
        return this.app.swapiFunctions.genericRequest(`https://swapi.dev./api/people/${id}`, 'GET', null, false);
    }
    
}

module.exports = PeopleService