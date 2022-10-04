import db, { sequelize } from "../../models/index.js";
const Jobs = db.Jobs;


const getAllJob = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const [results, metadata] = await sequelize.query(process.env.GETALLJOB_QUERY);
            resolve(results)
        } catch (error) {
            reject(error);
        }
    })
}

const createNewJob = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            await Jobs.create({
                name: data.name,
                description: data.description,
                salary: data.salary,
                quantity: data.quantity,
                start_date: data.start_date,
                end_date: data.end_date,
                status: data.status,
                Category_id: data.category,
                Campaign_id: data.campaign,
            })

            // console.log(data.campaign);

            resolve({
                errCode: 0,
                message: "OK"
            })
        } catch (error) {
            reject(error);
        }
    })
}

module.exports = {
    getAllJob,
    createNewJob,
}