import { QueryTypes } from "sequelize";
import db, { sequelize } from "../models/index.js";
const Jobs = db.Jobs;
const jobRepository = require("../repository/jobs.repository")
const getAllJob = () => {
  return new Promise(async (resolve, reject) => {
    try {
      //jobs without status == hidden
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
      const job = await jobRepository.createNewJobs(data);

      // console.log(data.campaign);
      resolve({
        errCode: 0,
        message: "Create job successfully",
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
      let job = await jobRepository.getJobsById(jobID);
      if (!job) {
        resolve({
          errMsg: "Job not found",
        });
      }
      await jobRepository.updateStatus({ id: jobID })

      resolve({
        errCode: 0,
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
const updateJob = async (data) => {
  try {
    const job = await jobRepository.getJobsById(data.id);
    console.log(job);

    if (job) {
      await jobRepository.update(data, { id: data.id })
    }
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getAllJob,
  createNewJob,
  deleteJob,
  getJobsByCampaignId,
  updateJob,
};
