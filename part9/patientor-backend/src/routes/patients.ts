import express from 'express';
import patientService from '../services/patientService';

const patientsRouter = express.Router();

patientsRouter.get('/', (_req, res) => {
  res.send(patientService.getNonSensitiveEntries());
});

export default patientsRouter;
