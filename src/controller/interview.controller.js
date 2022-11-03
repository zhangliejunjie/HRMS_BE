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
const updateInterview = async (req, res, next) => {
  try {
    // interviewService.updateInterviewByID()
    console.log(req.body);
  } catch (error) {}
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
    // console.log("create interview" + data);
    const createNewInterview = await interviewService.createNewInterview(data);
    res.json(createNewInterview);
  } catch (error) {
    next(error);
  }
};

const handleGetListCandidatesBySlot = async (req, res, next) => {
  try {
    const slot = req.body.slot;
    const room = req.body.room;
    const week = req.body.week;
    const candidateList = await interviewService.getListCandidatesBySlot(
      week,
      room,
      slot
    );
    res.json(candidateList);
  } catch (error) {
    next(error);
  }
};

const handleGetInterviewByCandidateId = async (req, res, next) => {
  try {
    const candidateId = req.body.candidateId;
    const result = await interviewService.getInterviewByCandidateId(
      candidateId
    );
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const handleUpdateInterviewByCampaignId = async (req, res, next) => {
  try {
    const week = req.body.week;
    const room = req.body.room;
    const slot = req.body.slot;
    const candidateId = req.body.candidateId;
    const result = interviewService.updateInterviewByID(
      candidateId,
      week,
      room,
      slot
    );
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  handleGetAllInterview,
  handleGetAllRooms,
  handleGetCandidatesNotInterview,
  handleGetNumCandidatesByRoomWeek,
  updateInterview,
  handleGetAllCandidates,
  handleCreateNewInterview,
  handleGetListCandidatesBySlot,
  handleGetInterviewByCandidateId,
  handleUpdateInterviewByCampaignId,
};
