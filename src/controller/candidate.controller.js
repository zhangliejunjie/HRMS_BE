// import { showAllCandidateDetails } from "../repository/candidates.repository";
import { request } from "express";
import {
  createNewCandidate,
  getListCandidate,
  getListCandidateByMemberID,
  candidateStatusChange,
  getAllCandidateByStaffID,
  getAllCandidateDetailWithStaffIDMemberIDJobID,
  updateCandidateProfileStatus,
} from "../service/candidate.service";

const candidateController = {
  async createCandidate(req, res, next) {
    try {
      const candidate = await createNewCandidate(req, res);
      return res.send(candidate);
    } catch (error) {
      next(error);
    }
  },
  async getCandidateByMember(req, res, next) {
    try {
      const candidateByMemberID = await getListCandidateByMemberID(req);
      return res.send(candidateByMemberID);
    } catch (error) {
      next(error);
    }
  },
  async getAllCandidate(req, res, next) {
    try {
      const candidateList = await getListCandidate();
      return res.send(candidateList);
    } catch (error) {
      next(error);
    }
  },
  async getCandidateByStaff(req, res, next) {
    try {
      const candidateList = await getAllCandidateByStaffID(req, res);
      return res.send(candidateList);
    } catch (error) {
      next(error);
    }
  },
  async changeCandidateStatus(req, res, next) {
    try {
      const candidateChange = await candidateStatusChange(req);
      return res.send(candidateChange);
    } catch (error) {
      next(error);
    }
  },

  async getAllCandidateDetails(req, res, next) {
    try {
      const candidateInformation =
        await getAllCandidateDetailWithStaffIDMemberIDJobID();
      return res.send(candidateInformation);
    } catch (error) {
      next(error);
    }
  },

  async handleUpdateCandidateProfile(req, res, next) {
    try {
      console.log(req.body);
      const reportId = req.body.candidateId;
      const appliedResult = req.body.result;
      const result = await updateCandidateProfileStatus(
        reportId,
        appliedResult
      );
      return res.json(result);
    } catch (error) {
      next(error);
    }
  },
};
module.exports = candidateController;
