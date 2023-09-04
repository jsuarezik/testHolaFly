const AbstractPeople = require("./abstractPeople");

const WookieMappings = {
    name: 'whrascwo',
    height: 'acwoahrracao',
    mass: 'scracc',
    homeworldId: 'acooscwoohoorcanwa'
  }

class WookiePeople extends AbstractPeople {
    constructor(people){
        super()
        this.name = people[WookieMappings['name']];
        this.height = people[WookieMappings['height']];
        this.mass = people[WookieMappings['mass']];
        this.homeworldId = people[WookieMappings['homeworldId']];
        this.homeworld_name = people['homeworld_name'];
    }
}

module.exports = WookiePeople;

