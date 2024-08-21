const memberModel = require('../models/memberModel');
const { successResponse, errorResponse } = require('../response/response');

const getMembers = async (req, res) => {
    const members = await memberModel.getAllMembers();
    res.status(200).json(successResponse(members));
};

module.exports = { getMembers };
