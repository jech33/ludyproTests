const { simpleExecute } = require('../db/config');

const baseQuery = `SELECT EMPRESA.EMPRCODI, EMPRESA.EMPRDESC, USMOIDUS, USMODESC FROM USUARIO
INNER JOIN EMPRESA ON EMPRESA.EMPRCODI = USUARIO.USMOEMPR`

async function find(context) {
    let query = baseQuery;

    if (context.company) {
        query += `\nWHERE EMPRESA.EMPRCODI = ${context.company}`
        
    }

    const result = await simpleExecute(query);

    return result.rows
}

module.exports = {
    find
};