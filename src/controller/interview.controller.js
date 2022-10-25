const interviewService = require("../service/interviewService")


const handleGetAllInterview = async (req, res, next) => {
    try {
        const interview = await interviewService.getAllInterviews();
        res.json({ interview });
    } catch (error) {
        next(error)
    }
}

const handleCreateNewInterview = async (req, res, next) => {
    try {
        const data = req.body
        const newInterview = await interviewService.createNewInterview(data);
        res.json({ newInterview });
    } catch (error) {
        next(error)
    }
}
module.exports = {
    handleGetAllInterview,
    handleCreateNewInterview,
}