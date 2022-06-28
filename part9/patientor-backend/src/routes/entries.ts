import express from 'express';
import { Request } from "express";
import entryService from '../services/entryService';
import { toNewEntry } from '../utils';

const entriesRouter = express.Router({
  mergeParams: true,
});


entriesRouter.post('/', (req: Request<{ patientId: string}>, res) => {
  const patientId = req.params.patientId;
  try {
    const newEntry = toNewEntry(req.body);

    const addedPatient = entryService.addEntry(newEntry, patientId);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default entriesRouter;
