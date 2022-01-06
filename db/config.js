const oracledb = require('oracledb');
const dbConfig = require("./dboracle")

// Initialize database
const initialize = async() => {
    await oracledb.createPool(dbConfig.connection);
}

// Close database
const close = async() => {
    await oracledb.getPool('lp').close();
}
// Make queries
const simpleExecute = (statement) => {
    return new Promise(async (resolve, reject) => {
        let connection = await oracledb.getConnection('lp')

        try {
            console.log("Connection successful");

            const result = await connection.execute(
                statement,
                [],
                {
                    resultSet: false, outFormat: oracledb.OUT_FORMAT_OBJECT
                }
            )
            resolve(result)

        } catch (err) {
            reject(err);
            
        } finally {
            if (connection) {
                try {
                    await connection.close();
                } catch (err) {
                    console.log(err)
                }
            }
        }
    });

}

module.exports = {
    initialize,
    close,
    simpleExecute
};