const interviewRepository = require("../repository/interview.repository");

const getAllInterviews = async () => {
  try {
    const where = { status: ["Processing", "Waiting", "Done", "Cancelled"] };
    const interview = await interviewRepository.getInterviews(where);
    console.log(interview);
    return interview;
  } catch (error) {
    throw error;
  }
};

const getAllRooms = async () => {
  try {
    const rooms = await interviewRepository.getAllRooms();
    return rooms;
  } catch (error) {
    throw error;
  }
};

const getCandidatesNotInterview = async () => {
  try {
    const candidates = await interviewRepository.getCandidatesNotInterview();
    return candidates;
  } catch (error) {
    throw error;
  }
};

const getNumCandidatesByRoomWeek = async (week) => {
  try {
    const data = await interviewRepository.getNumCandidatesByRoomWeek(week);
    return data;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllInterviews,
  getAllRooms,
  getCandidatesNotInterview,
  getNumCandidatesByRoomWeek,
};
