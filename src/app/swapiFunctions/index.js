const fetch = require('node-fetch');

const genericRequest = async (url, method, body, logging = false) => {
    let options = {
        method: method
    }
    if(body){
        options.body = body;
    }
 
    const response = await fetch(url, options).catch( error => console.log(error));
    const data = await response.json().catch(error => console.log(error));
    if(logging){
        console.log(data);
    }
    
    return data;
}

module.exports = {
    genericRequest
}