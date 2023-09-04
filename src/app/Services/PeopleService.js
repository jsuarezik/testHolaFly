const { peopleFactory } = require("../People");
const PlanetService = require("./PlanetService");

class PeopleService {

    constructor(app) {
        this.app = app;
        this.PlanetService = new PlanetService(app)
    }

    async getPeopleById(id, lang) {
        const people = await this.app.db.swPeople.findOne({where : {id: id, isWookiee : lang == 'wookiee'}})
        if (people) {
            return await peopleFactory(people, lang);
        } else {
            const data = await this.getPeopleFromTheAPI(id, lang);
            if (!data.hasOwnProperty('detail')) {
                const planetUrl= data.homeworld || data.acooscwoohoorcanwa;
                const planetId= planetUrl.match(/\/(\d+)\//);
                if (planetId && planetId[1]) {
                    const planet = await this.PlanetService.getPlanetById(planetId[1]);
                    if (planet) {
                        return await peopleFactory({... data, homeworld_name: planet.name }, lang);
                    }
                }
                return await peopleFactory(data, lang);
            } 
        }

        return null;
    }

    async getPeopleFromTheAPI(id, lang) {
        return this.app.swapiFunctions.genericRequest(`https://swapi.dev/api/people/${id}${lang == 'wookiee' ? '?format=wookiee' : '' }`, 'GET', null, true);
    }
    
}

module.exports = PeopleService