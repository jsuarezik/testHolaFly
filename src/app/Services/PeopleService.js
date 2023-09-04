const { peopleFactory } = require("../People");


class PeopleService {

    constructor(app) {
        this.app = app;
    }

    async getPeopleById(id, lang) {
        const people = await this.app.db.swPeople.findOne({where : {id: id}})
        if (people) {
            return await peopleFactory(people, lang);
        } else {
            const data = await this.getPeopleFromTheAPI(id);
            if (!data.hasOwnProperty('detail')) {
                //TODO Planet Service to get the planet name injected into the data OR work with associations TBD
                return await peopleFactory(data, lang);
            } 
        }

        return null;
    }

    async getPeopleFromTheAPI(id) {
        return this.app.swapiFunctions.genericRequest(`https://swapi.dev./api/people/${id}`, 'GET', null, true);
    }
    
}

module.exports = PeopleService