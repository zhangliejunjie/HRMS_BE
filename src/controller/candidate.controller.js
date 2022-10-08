import { showAllCandidateDetails } from "../repository/candidates.repository";
import {
  createNewCandidate,
  getListCandidate,
  getListCandidateByMemberID,
} from "../service/candidate.service";

const candidateController = {
  async createCandidate(req, res, next) {
    try {
      const candidate = await createNewCandidate(req, res);
      res.send(candidate);
    } catch (error) {
      next(error);
    }
  },
  async getCandidateByMember(req, res, next) {
    try {
      const candidateByMemberID = await getListCandidateByMemberID(req);
      // res.send(candidateByMemberID);
    } catch (error) {
      next(error);
    }
  },
  async getAllCandidate(req, res, next) {
    try {
      const candidateList = await getListCandidate();
      res.send(candidateList);
    } catch (error) {
      next(error);
    }
  },
};
module.exports = candidateController;
