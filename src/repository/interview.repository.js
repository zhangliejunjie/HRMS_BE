const db = require("../models");

const Interviews = db.Interviews;


const getInterviews = async (where) => {
    return (await Interviews.findAll({
        where: where,
        raw: true
    }))
}

module.exports = { getInterviews }

