const interviewRepository = require("../repository/interview.repository")

const getAllInterviews = async () => {
    try {
        const where = { status: ['Processing', 'Waiting', 'Done', 'Cancelled'] }
        const interview = await interviewRepository.getInterviews(where);
        console.log(interview);
        return interview;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getAllInterviews,
}