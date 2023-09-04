const { peopleFactory } = require("../../app/People");
const PeopleService = require("../../app/Services/PeopleService");

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
        const db = app.db;
        const id = req.params.id;
        const lang = _isWookieeFormat(req) ? 'wookie' : 'human';
        const peopleService = new PeopleService (app);
        const person = await peopleService.getPeopleById(id);
        if (person) {
            res.status(200).json( {
                data: person,
                succes: true,
                message: 'success',
            })
        } else {
            res.status(404).json( {
                data: null,
                succes: false,
                message: 'ERROR_NOT_FOUND',
            })
        }
    });

    server.get('/hfswapi/getPlanet/:id', async (req, res) => {
        res.sendStatus(501);
    });

    server.get('/hfswapi/getWeightOnPlanetRandom', async (req, res) => {
        res.sendStatus(501);
    });

    server.get('/hfswapi/getLogs',async (req, res) => {
        const data = await app.db.logging.findAll();
        res.send(data);
    });

}

module.exports = applySwapiEndpoints;