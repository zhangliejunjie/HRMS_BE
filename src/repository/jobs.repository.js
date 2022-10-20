const db = require("../models");
const Jobs = db.Jobs;


const getJobsById = async (id) => {
    return (
        await Jobs.findOne({
            where: {
                id: id,
            },
        })
    )?.dataValues;
};

const createNewJobs = async (data) => {
    return (
        await Jobs.create({
            name: data.name,
            description: data.description,
            salary: data.salary,
            quantity: data.quantity,
            start_date: data.start_date,
            end_date: data.end_date,
            status: data.status,
            experience: data.experience,
            Category_id: data.categoryId,
            Campaign_id: data.campaignId,
        })
    )
}
const updateStatus = async (where) => {
    return (
        await Jobs.update({ status: "Hidden" }, {
            where: where,
        }
        )
    )
}

const update = async (newObj, where) => {
    await Jobs.update(newObj, {
        where: where,
    });
}

module.exports = {
    getJobsById,
    createNewJobs,
    updateStatus,
    update
};