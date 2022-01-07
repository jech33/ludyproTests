const CONFIG1 = require("../index.json");

connection = () => {

    const dbParameters = {
        "poolAlias": 'lp',
        "host": "192.168.192.65",
        "port": 2015,
        "username": "",
        "password": "",
        "sid": "ludypro",
        "database": "LUDYCOM",
        "connectString": "(DESCRIPTION =(ADDRESS = (PROTOCOL = TCP)(HOST = 181.57.223.107)(PORT = 2015))(CONNECT_DATA =(SERVER = DEDICATED)(SERVICE_NAME = ludypro)))",
        poolMin: 10,
        poolMax: 10,
        poolIncrement: 0
    }

    const environment = "dev";

    switch (environment) {
        case 'dev':
            dbParameters.username = CONFIG1.env.dev.username;
            dbParameters.password = CONFIG1.env.dev.password;
            dbParameters.connectString = CONFIG1.env.dev.connectString;
            break
        case 'qa':
            dbParameters.username = CONFIG1.env.qa.username;
            dbParameters.password = CONFIG1.env.qa.password;
            dbParameters.connectString = CONFIG1.env.qa.connectString;
            break
        case 'prod':
            dbParameters.username = CONFIG1.env.prod.username;
            dbParameters.password = CONFIG1.env.prod.password;
            dbParameters.connectString = CONFIG1.env.prod.connectString;
            break
    }

    return dbParameters;
}

module.exports = {
    connection
}