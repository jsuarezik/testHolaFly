const { peopleFactory } = require("../../app/People");
const PeopleService = require("../../app/Services/PeopleService");
const PlanetService = require("../../app/Services/PlanetService");

const _isWookieeFormat = (req) => {
    if(req.query.format && req.query.format == 'wookiee'){
        return true;
    }
    return false;
}


const applySwapiEndpoints = (server, app) => {
    server.get('/hfswapi/test', async (req, res) => {
        const data = await app.swapiFunctions.genericRequest('https://swapi.dev/api/', 'GET', null, true);
        res.send(data);
    });

    server.get('/hfswapi/getPeople/:id', async (req, res) => {
        const id = req.params.id;
        const lang = _isWookieeFormat(req) ? 'wookiee' : 'human';
        const peopleService = new PeopleService(app);
        const person = await peopleService.getPeopleById(id, lang);
        if (person) {
            res.status(200).json( {
                data: person,
                succes: true,
            })
        } else {
            res.status(404).json( {
                data: { message : 'People not found' },
                succes: false,
                message: 'ERROR_NOT_FOUND',
            })
        }
    });

    server.get('/hfswapi/getPlanet/:id', async (req, res) => {
        const id = req.params.id;
        const planetService = new PlanetService(app);
        const planet = await planetService.getPlanetById(id);
        if (planet) {
            res.status(200).json( {
                data: planet,
                succes: true,
            })
        } else {
            res.status(404).json( {
                data: { message : 'Planet not found'},
                succes: false,
                message: 'ERROR_NOT_FOUND',
            })
        }
    });

    server.get('/hfswapi/getWeightOnPlanetRandom', async (req, res) => {
        const lang = _isWookieeFormat(req) ? 'wookiee' : 'human';
        const peopleService = new PeopleService(app);
        const planetService = new PlanetService(app);
        const promises = await Promise.all( [
            peopleService.getRandomPeople(lang),
            planetService.getRandomPlanet(),
        ]);
        const [people, planet] = promises
        console.log(people, planet)
        if ((people && planet) && (people.homeworldName === planet.name)) {
            res.status(422).json({
                succes: false,
                data: { message : "Person belongs to the same Planet"},
                message : 'ERROR_SAME_PEOPLE_SAME_PLANET'
            })
        } else {
            const weightOnPlanet = people.getWeightOnPlanet(planet);

            res.status(200).json({
                success: true,
                data : {
                    peopleName: people.name, 
                    planetName: planet.name,
                    weight: weightOnPlanet,
                }
            })
        }
    });

    server.get('/hfswapi/getLogs',async (req, res) => {
        const data = await app.db.logging.findAll();
        res.status(200).json( {
            success: true,
            data : data, 
        })
    });

}

module.exports = applySwapiEndpoints;