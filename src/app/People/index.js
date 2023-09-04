//const WookieePeople = require('./wookieePeople');
const CommonPeople = require('./commonPeople');

const peopleFactory = async (model, lang) => {
    let people = null;
    if (lang == 'wookiee'){
        //people = new WookieePeople(model);
    } else {
        people = new CommonPeople(model);
    }
    
    return people;
}

module.exports = { peopleFactory }