class AbstractPeople {

    constructor(people) {
        if (this.constructor == AbstractPeople) {
            throw new Error("Abstract classes can't be instantiated.");
        }
    }

    async init(){
        throw new Error('To be implemented');
    }

    getId() {
       return this.id;
    }

    getName() {
        return this.name;
    }

    getMass() {
        return this.mass;
    }

    getHeight() {
        return this.height;
    }

    getHomeworldName() {
        return this.homeworldName;
    }

    getHomeworlId() {
        return this.homeworlId;
    }

    getWeightOnPlanet(planet){
        if (this.getMass() == 'unknown' || planet.gravity == 'unknown' ) {
            return 'unknown'
        } 
        return this.getMass() * planet.getGravity();
    }
}

module.exports = AbstractPeople;