import db, { sequelize } from "../../models/index.js";
const Jobs = db.Jobs;

const getAllJob = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const [results, metadata] = await sequelize.query(
                "SELECT J.name, J.salary, J.quantity, CP.title as campaign, CG.name as category, J.start_date, J.end_date FROM hrms.jobs J INNER JOIN hrms.categories CG ON J.Category_id = CG.id INNER JOIN hrms.campaigns CP ON J.Campaign_id = CP.id"
            )

            resolve(results)
        } catch (error) {
            reject(error);
        }
    })
}

module.exports = {
    getAllJob,
}