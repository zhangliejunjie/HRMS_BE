const jobService = require("../service/jobService.js");

const handleGetAllJob = async (req, res, next) => {
  try {
    let jobs = await jobService.getAllJob();
    return res.json({ jobs });
  } catch (error) {
    next(error);
  }
};

const handleCreateNewJob = async (req, res, next) => {
  try {
    let job = await jobService.createNewJob(req.body);
    return res.json({ job });
  } catch (error) {
    next(error);
  }
};

const handleDeleteJob = async (req, res, next) => {
  try {
    const deleJob = await jobService.deleteJob(req.params.id);
    return res.json({ deleJob });
  } catch (error) {
    next(error);
  }
};
const handleUpdateJob = async (req, res, next) => {
  try {
    const data = req.body;
    const updateJob = await jobService.updateJob(data);
    return res.json({
      msg: "Job updated",
      updateJob,
    });
  } catch (error) {
    next(error);
  }
};

const handleGetJobsByCampaignId = async (req, res, next) => {
  try {
    const data = req.body;
    console.log(data.campaignId);
    const jobs = await jobService.getJobsByCampaignId(data.campaignId);
    return res.json({ jobs });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  handleGetAllJob,
  handleCreateNewJob,
  handleDeleteJob,
  handleUpdateJob,
  handleGetJobsByCampaignId,
};
