import { QueryTypes } from "sequelize";
import db, { sequelize } from "../models/index.js";
const Jobs = db.Jobs;

const getAllJob = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const [results, metadata] = await sequelize.query(
        process.env.GETALLJOB_QUERY
      );
      resolve(results);
    } catch (error) {
      reject(error);
    }
  });
};

const createNewJob = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const job = await Jobs.create({
        name: data.name,
        description: data.description,
        salary: data.salary,
        quantity: data.quantity,
        start_date: data.start_date,
        end_date: data.end_date,
        status: data.status,
        experience: data.experience,
        Category_id: data.category,
        Campaign_id: data.campaign,
      });

      // console.log(data.campaign);

      resolve({
        errCode: 0,
        message: "OK",
        job,
      });
    } catch (error) {
      reject(error);
    }
  });
};

const deleteJob = (jobID) => {
  return new Promise(async (resolve, reject) => {
    try {
      let job = await Jobs.findOne({
        where: { id: jobID },
      });
      if (!job) {
        resolve({
          errMsg: "Job not found",
        });
      }
      await Jobs.destroy({
        where: { id: jobID },
      });
      resolve({
        errMsg: "Job is deleted",
      });
    } catch (error) {
      reject(error);
    }
  });
};

const getJobsByCampaignId = (campaignId) => {
  const getJobsByCampaignIdQuery =
    "SELECT J.id, J.name, J.description, J.salary, J.quantity, J.experience, J.isRemote, J.start_date, J.end_date FROM hrms.jobs AS J WHERE J.Campaign_id = ?";
  return new Promise(async (resolve, reject) => {
    try {
      const [results, metadata] = await sequelize.query(
        getJobsByCampaignIdQuery,
        {
          replacements: [campaignId],
          type: QueryTypes.SELECT,
        }
      );
      resolve(results);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  getAllJob,
  createNewJob,
  deleteJob,
  getJobsByCampaignId,
};
