const interviewService = require("../service/interviewService");

const handleGetAllInterview = async (req, res, next) => {
  try {
    const getInterview = await interviewService.getAllInterviews();
    res.json(getInterview);
  } catch (error) {
    next(error);
  }
};

const handleGetAllRooms = async (req, res, next) => {
  try {
    const getAllRooms = await interviewService.getAllRooms();
    res.json(getAllRooms);
  } catch (error) {
    next(error);
  }
};

const handleGetCandidatesNotInterview = async (req, res, next) => {
  try {
    const getCandidatesNotInterview =
      await interviewService.getCandidatesNotInterview();
    res.json(getCandidatesNotInterview);
  } catch (error) {
    next(error);
  }
};

const handleGetNumCandidatesByRoomWeek = async (req, res, next) => {
  try {
    const week = req.body.week;
    const getNumCandidatesByRoomWeek =
      await interviewService.getNumCandidatesByRoomWeek(week);
    res.json(getNumCandidatesByRoomWeek);
  } catch (error) {
    next(error);
  }
};

const handleGetAllCandidates = async (req, res, next) => {
  try {
    const getAllCandidates = await interviewService.getAllCandidates();
    res.json(getAllCandidates);
  } catch (error) {
    next(error);
  }
};

const handleCreateNewInterview = async (req, res, next) => {
  try {
    const data = req.body;
    const createNewInterview = await interviewService.createNewInterview(data);
    res.json(createNewInterview);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  handleGetAllInterview,
  handleGetAllRooms,
  handleGetCandidatesNotInterview,
  handleGetNumCandidatesByRoomWeek,
  handleGetAllCandidates,
  handleCreateNewInterview,
};
