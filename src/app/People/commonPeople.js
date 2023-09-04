const abstractPeople = require('./abstractPeople')

class CommonPeople extends abstractPeople {
    constructor(people){
        super()
        this.id = people.id;
        this.name = people.name;
        this.mass = people.mass;
        this.height = people.height;
        this.homeworldName = people.homeworld_name;
        this.homeworldId = people.homeworld_id || people.homeworld;
    }
}

module.exports = CommonPeople;