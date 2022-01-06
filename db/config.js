const oracledb = require('oracledb');
const dbConfig = require("./dboracle");
const mongoose = require('mongoose');

// Initialize ORACLE database
const initialize = async () => {
    await oracledb.createPool(dbConfig.connection);
}

// Close ORACLE database
const close = async () => {
    await oracledb.getPool('lp').close();
}
// Make ORACLE queries
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

const mongoConnection = async () => {

    try {

        await mongoose.connect(process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('Connected to Mongo database');

    } catch (error) {
        console.log(error);
        throw new Error('MongoDB connection error');
    }

}

module.exports = {
    initialize,
    close,
    simpleExecute,
    mongoConnection
};