const db = require('../config/db');

const addPenalty = async (memberCode, penaltyStart, penaltyEnd) => {
    await db.query('INSERT INTO Penalties (member_code, penalty_start, penalty_end) VALUES (?, ?, ?)', [memberCode, penaltyStart, penaltyEnd]);
};

const getPenaltyByMember = async (memberCode) => {
    const [rows] = await db.query('SELECT * FROM Penalties WHERE member_code = ? AND penalty_end > NOW()', [memberCode]);
    return rows.length > 0;
};

module.exports = { addPenalty, getPenaltyByMember };
