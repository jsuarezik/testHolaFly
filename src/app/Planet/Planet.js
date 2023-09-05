class Planet {
    constructor(model){
        this.id = model.id
        this.name = model.name
        this.gravity = model.gravity == 'unknown' ? 'unknown' : model.gravity[0];
    }

    getName() {
        return this.name;
    }

    getGravity() {
        return this.gravity;
    }
}

module.exports = Planet;