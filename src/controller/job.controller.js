const jobService = require("../service/jobService.js")

const handleGetAllJob = async (req, res) => {
    let jobs = await jobService.getAllJob();

    return res.status(200).json({
        errCode: 0,
        errMsg: "OK",
        jobs
    });
}

const handleCreateNewJob = async (req, res) => {
    let message = await jobService.createNewJob(req.body);
    return res.status(200).json(message);
}

const handleDeleteJob = async (req, res) => {
    if (!req.body.id) {
        return res.status(404).json({ errMsg: 'id not found' });
    }
    let message = await jobService.deleteJob(req.body.id);
    return res.status(200).json(message);
}


module.exports = {
    handleGetAllJob,
    handleCreateNewJob,
    handleDeleteJob,
}