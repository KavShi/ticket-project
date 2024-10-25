const mysql = require("promise-mysql");
const config = require("./../config/db/config.json");

async function showAll() {
    const db = await mysql.createConnection(config);
    let sql = `
    SELECT
    ticketNumber,
    lastName,
    firstName,
    topic,
    title,
    additionalInfo,
    DATE_FORMAT(dateCreated, "%Y-%m-%d") AS dateCreated,
    DATE_FORMAT(dateUpdated, "%Y-%m-%d") as dateUpdated,
    ticketStatus,
    filePath
    from tickets;
    `;
    let res = await db.query(sql);
    return res;
}

module.exports = {
    "showAll": showAll
};
