import { UUIDV4 } from "sequelize";
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

// const createNewJob = (data) => {
//     return new Promise(async (resolve, reject) => {
//         try {

//             await Jobs.create({
//                 id: UUIDV4(),
//                 name: data.name,
//                 description: data.description
//             })
//             resolve({
//                 errCode: 0,
//                 message: "OK"
//             })
//         } catch (error) {
//             reject(error);
//         }
//     })
// }

module.exports = {
    getAllJob,
    // createNewJob,
}