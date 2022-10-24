import { QueryTypes } from "sequelize";
import db, { sequelize } from "../models/index.js";
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
  return await Jobs.create({
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
  });
};
const updateStatus = async (where) => {
  return await Jobs.update(
    { status: "Hidden" },
    {
      where: where,
    }
  );
};

const update = async (newObj, where) => {
  await Jobs.update(newObj, {
    where: where,
  });
};

const getJobsByCampaignId = async (campaignId) => {
  const getJobsByCampaignIdQuery =
    "SELECT J.id, J.name, J.description, J.salary, J.quantity, J.experience, J.isRemote, J.start_date, J.end_date FROM hrms.jobs AS J WHERE J.Campaign_id = ?";
  const data = await sequelize.query(getJobsByCampaignIdQuery, {
    replacements: [campaignId],
    type: QueryTypes.SELECT,
    plain: false,
  });
  console.log(data);
  return data;
};

module.exports = {
  getJobsById,
  createNewJobs,
  updateStatus,
  update,
  getJobsByCampaignId,
};
