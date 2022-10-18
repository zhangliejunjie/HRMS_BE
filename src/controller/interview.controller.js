const interviewService = require("../service/interviewService")


const handleGetAllInterview = async (req, res, next) => {
    try {
        const getInterview = await interviewService.getAllInterviews();
        res.json(getInterview);
    } catch (error) {
        next(error)
    }
}

module.exports = {
    handleGetAllInterview,

}