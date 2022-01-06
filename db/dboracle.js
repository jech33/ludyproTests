connection = {
    "poolAlias": 'lp',
    "host": "192.168.192.65",
    "port": 2015,
    "username": process.env.LUDYUSER,
    "password": process.env.LUDYPASSWORD,
    "sid": "ludypro",
    "database": "LUDYCOM",
    "connectString": "(DESCRIPTION =(ADDRESS = (PROTOCOL = TCP)(HOST = 181.57.223.107)(PORT = 2015))(CONNECT_DATA =(SERVER = DEDICATED)(SERVICE_NAME = ludypro)))",
    poolMin: 10,
    poolMax: 10,
    poolIncrement: 0
}

module.exports = {
    connection
}